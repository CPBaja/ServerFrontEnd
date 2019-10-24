import * as React from "react"
import * as Impetus from "impetus"
import ReactDOM from "react-dom"
import {throttle} from "lodash"

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.onTimeframeUpdate = throttle(props.onTimeframeUpdate, 1000/60);

        this.center = 0;
        this.radius = 0; //How far to left and right of center we can see.

        this.timeMin = 0;
        this.timeMax = 0;

        this.lastX = 0;

        this.minorDivisions = .1;
        this.majorDivisions = .21;
        this.divisionPlace = 0;

        /*Styling Consts*/
        //TICKS
        this.MAJOR_TICK_WIDTH = 3;
        this.MAJOR_TICK_HEIGHT = 40;

        this.MINOR_TICK_WIDTH = 1;
        this.MINOR_TICK_HEIGHT = 30;

        //COLORS
        this.MAJOR_TICK_COLOR = 'rgb(250, 250, 250)';
        this.MINOR_TICK_COLOR = 'rgb(210, 210, 210)';

        this.zoomMotionMultiplier = 1;

        this.zoomWheelMultiplier = .001;


    }

    componentDidMount() {
        this.canvas = ReactDOM.findDOMNode(this);
        this.ctx = this.canvas.getContext("2d");

        this.cwidth = this.canvas.scrollWidth;
        this.cheight = this.canvas.scrollHeight;

        this.imp = new Impetus({
            source: this.canvas,
            update: (x) => this.update(x),
            friction: .75
            //boundX: [-1000, 0]
        });

        window.addEventListener("resize", () => {
            //this.canvas = this.
            this.redraw();
        });

        /* Touch Shit */
        this.canvas.addEventListener("touchstart", (event) => this.touchStarted(event));
        this.canvas.addEventListener("touchend", (event) => this.touchEnded(event));
        this.canvas.addEventListener("touchcancel", (event) => this.touchEnded(event));
        this.canvas.addEventListener("wheel", (event) => this.wheelScrolled(event));

        this.setRad(1);
        this.update(0);
    }

    update(newX) {

        let dx = newX - this.lastX;

        this.center += -dx * this.radius * 2 / (this.cwidth);
        this.lastX = newX;
        this.calcTimeBounds();
        this.redraw();
    }

    redraw() {
        if(this.onTimeframeUpdate){
            this.onTimeframeUpdate([this.timeMin, this.timeMax]);
        } else {
            console.log("Timeframe updated, but no listener!")
        }

        /* Update vars needed to draw new canvas*/
        this.cwidth = this.canvas.scrollWidth;
        this.cheight = this.canvas.scrollHeight;
        this.canvas.height = this.cheight;
        this.canvas.width = this.cwidth;

        //this.ctx.clearRect(0, 0, this.cwidth, this.cheight);

        this.ctx.fillStyle = 'rgb(120,120,120)';
        this.ctx.fillRect(0, 0, this.cwidth, this.cheight);

        this.drawTicks(this.minorDivisions, this.majorDivisions);

        this.drawDisabledBackground(0, -1);

        this.drawPositionLine();
    }

    drawPositionLine() {
        let centerPx = this.cwidth / 2;
        this.ctx.fillStyle = 'rgba(255,0,0,.6)';
        this.ctx.fillRect(centerPx - this.MAJOR_TICK_WIDTH / 2, 0, this.MAJOR_TICK_WIDTH, this.cheight);
        this.ctx.fillStyle = 'rgb(240,240,240)';
        this.ctx.textAlign = "left";
        this.ctx.fillText(this.center, centerPx + 2, this.cheight - 2);
    }

    drawDisabledBackground(timeStart, direction) {
        if (direction < 0) {
            this.ctx.fillStyle = 'rgba(0,0,0,.3)';
            this.ctx.fillRect(0, 0, this.timeToPx(timeStart), this.cheight);
        } else if (direction > 0) {
            this.ctx.fillStyle = 'rgba(0,0,0,.3)';
            this.ctx.fillRect(this.timeToPx(timeStart), 0, this.cwidth, this.cheight);
        }
    }

    drawTicks(minorDivisions, majorDivisions) {
        this.ctx.font = '12px Arial';
        this.ctx.fillStyle = 'rgb(230, 230, 230)';

        let minorLowerMark = (Math.floor(this.timeMin / minorDivisions) * minorDivisions);
        let minorUpperMark = (Math.ceil(this.timeMax / minorDivisions) * minorDivisions);
        for (let i = minorLowerMark; i <= minorUpperMark; i += minorDivisions) {
            this.drawTick(i, false);
        }

        let majorLowerMark = (Math.floor(this.timeMin / majorDivisions) * majorDivisions);
        let majorUpperMark = (Math.ceil(this.timeMax / majorDivisions) * majorDivisions);
        for (let i = majorLowerMark; i <= majorUpperMark; i += majorDivisions) {
            this.drawTick(i, true);
        }

    }

    /* Draws one tick on the timeline. Takes a val + whether it's a major (labeled) or minor (unlabeled + smaller) tick*/
    drawTick(timeVal, major) {
        this.ctx.textAlign = "center";
        let centerPx = this.timeToPx(timeVal);
        if (major) {
            this.ctx.fillStyle = this.MAJOR_TICK_COLOR;
            this.ctx.fillRect(centerPx - this.MAJOR_TICK_WIDTH / 2, 0, this.MAJOR_TICK_WIDTH, this.MAJOR_TICK_HEIGHT);
            this.ctx.fillText(timeVal.toFixed(clamp(-this.divisionPlace, 0, 100)), centerPx, this.MAJOR_TICK_HEIGHT + 14); //Write the text of it.
        } else {
            this.ctx.fillStyle = this.MINOR_TICK_COLOR;
            this.ctx.fillRect(centerPx - this.MINOR_TICK_WIDTH / 2, 0, this.MINOR_TICK_WIDTH, this.MINOR_TICK_HEIGHT);
        }
    }

    timeToPx(time) {
        return this.map(time, this.timeMin, this.timeMax, 0, this.cwidth);
    }

    map(x, in_min, in_max, out_min, out_max) {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    calcTimeBounds() {
        this.timeMin = this.center - this.radius;
        this.timeMax = this.center + this.radius;
    }

    setRad(newR) {
        this.radius = Math.abs(newR);
        this.updateDivisions();
        this.calcTimeBounds();
        this.redraw();
    }

    updateDivisions() {
        let places = Math.floor(Math.log10(this.radius));
        let majorDivisions = Math.pow(10, places);
        let minorDivisions = Math.pow(10, places - 1);
        //console.log(places, majorDivisions, minorDivisions);

        this.divisionPlace = places;
        this.majorDivisions = majorDivisions;
        this.minorDivisions = minorDivisions;
    }

    touchStarted(event) {
        if (event.touches.length === 2) { //2 fingers are on the screen, start zooming.
            this.imp.pause();
            this.tmListener = (event) => this.touchMove(event);
            this.canvas.addEventListener("touchmove", this.tmListener);
            this.originalRad = this.radius;
            this.originalDs = event.touches[0].pageX - event.touches[1].pageX;
        }
    }

    touchEnded(event) {
        if (event.touches.length !== 2) { //2 fingers are on the screen, start zooming.
            this.imp.resume();
            this.canvas.removeEventListener("touchmove", this.tmListener);
        }
    }

    touchMove(event) {
        if(event.touches[0] && event.touches[1]){
            let newDs = event.touches[0].pageX - event.touches[1].pageX;
            let newRad = this.originalRad * (this.originalDs / newDs) * this.zoomMotionMultiplier;
            this.setRad(newRad);
            event.preventDefault();
        } else {
            this.touchEnded(event);
        }

    }

    wheelScrolled(event) {
        this.setRad(this.radius + (event.deltaY * this.zoomWheelMultiplier * this.radius));
    }

    render() {
        return (
            <canvas style={this.props.style}>
            </canvas>
        );
    }
}

function clamp(num, min, max) {
    return num <= min ? min : num >= max ? max : num;
}
