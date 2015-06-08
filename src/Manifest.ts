
module Manifesto {
    export class Manifest {

        public jsonld: any;

        //private _id: string;
        //private _label: string;
        private _rootRange: Range;
        public sequences: Sequence[] = [];
        public structures: Range[] = [];
        //private _viewingDirection: ViewingDirection;
        //private _viewingHint: ViewingHint;

        //canvasIndex: 0,
        //defaultLabel: '-',
        public locale: string = "en-GB";
        //sequenceIndex: 0,

        constructor(jsonld: any) {
            this.jsonld = jsonld;
        }

        getLabel(): string {
            return this.getLocalisedValue(this.jsonld.label);
        }

        //getAttribution: function(): string {
        //    return <string>this.getLocalisedValue(this.manifest.attribution);
        //},
        //
        //getCanvasById: function(id: string): m.Canvas{
        //
        //    for (var i = 0; i < this.getTotalCanvases(); i++) {
        //        var canvas = this.getCanvasByIndex(i);
        //
        //        if (canvas.id === id){
        //            return canvas;
        //        }
        //    }
        //
        //    return null;
        //},
        //
        //getCanvasByIndex: function(index: number): any {
        //    return this.getCurrentSequence().canvases[index];
        //},
        //
        //getCanvasIndexById(id: string): number {
        //
        //    for (var i = 0; i < this.getTotalCanvases(); i++) {
        //        var canvas = this.getCanvasByIndex(i);
        //
        //        if (canvas.id === id){
        //            return i;
        //        }
        //    }
        //
        //    return null;
        //},
        //
        //getCanvasIndexByLabel: function(label: string): number {
        //    label = label.trim();
        //
        //    // trim any preceding zeros.
        //    if (_.isNumber(label)) {
        //        label = parseInt(label, 10).toString();
        //    }
        //
        //    var doublePageRegExp = /(\d*)\D+(\d*)/;
        //    var match, regExp, regStr, labelPart1, labelPart2;
        //
        //    for (var i = 0; i < this.getTotalCanvases(); i++) {
        //        var canvas: m.Canvas = this.getCanvasByIndex(i);
        //
        //        // check if there's a literal match
        //        if (canvas.label === label) {
        //            return i;
        //        }
        //
        //        // check if there's a match for double-page spreads e.g. 100-101, 100_101, 100 101
        //        match = doublePageRegExp.exec(label);
        //
        //        if (!match) continue;
        //
        //        labelPart1 = match[1];
        //        labelPart2 = match[2];
        //
        //        if (!labelPart2) continue;
        //
        //        regStr = "^" + labelPart1 + "\\D+" + labelPart2 + "$";
        //
        //        regExp = new RegExp(regStr);
        //
        //        if (regExp.test(canvas.label)) {
        //            return i;
        //        }
        //    }
        //
        //    return -1;
        //},
        //
        //getCanvasRange: function(canvas: m.Canvas): m.Range {
        //    // get the deepest Range that this Canvas belongs to.
        //    if (canvas.ranges){
        //        return canvas.ranges.last();
        //    }
        //
        //    return null;
        //},
        //
        //getCanvasType: function(canvas?: m.Canvas): m.CanvasType {
        //    if (!canvas) canvas = this.getCurrentCanvas();
        //    return canvas.type;
        //},
        //
        //getCurrentCanvas: function(): m.Canvas {
        //    return this.getCanvasByIndex(this.canvasIndex);
        //},
        //
        //getCurrentSequence: function(): m.Sequence {
        //    return this.manifest.sequences[this.sequenceIndex];
        //},
        //
        //getLastCanvasLabel: function(): string {
        //    // get the last label that isn't empty or '-'.
        //    for (var i = this.getTotalCanvases() - 1; i >= 0; i--) {
        //        var canvas: m.Canvas = this.getCanvasByIndex(i);
        //
        //        var regExp = /\d/;
        //
        //        if (regExp.test(canvas.label)) {
        //            return this.getLocalisedValue(canvas.label);
        //        }
        //    }
        //
        //    // none exists, so return '-'.
        //    return this.defaultLabel;
        //},
        //
        //getLastPageIndex: function(): number {
        //    return this.getTotalCanvases() - 1;
        //},
        //

        getLocalisedValue(prop: any, locale?: string): string {

            if (!_.isArray(prop)){
                return prop;
            }

            if (!locale) locale = this.locale;

            // test for exact match
            for (var i = 0; i < prop.length; i++){
                var value = prop[i];
                var language = value['@language'];

                if (locale === language){
                    return <string>value['@value'];
                }
            }

            // test for inexact match
            var match = locale.substr(0, locale.indexOf('-'));

            for (var i = 0; i < prop.length; i++){
                var value = prop[i];
                var language = value['@language'];

                if (language === match){
                    return <string>value['@value'];
                }
            }

            return null;
        }
        //
        //getLogo(): string {
        //    return this.manifest.logo;
        //},
        //
        //getLicense(): string {
        //    return this.manifest.license;
        //},
        //
        //getNextPageIndex: function(canvasIndex?: number, pagingEnabled?: boolean): number {
        //    if (_.isUndefined(canvasIndex)) canvasIndex = this.canvasIndex;
        //
        //    var index;
        //
        //    if (pagingEnabled){
        //        var indices = this.getPagedIndices(canvasIndex);
        //
        //        if (this.getViewingDirection() === m.ViewingDirection.rightToLeft){
        //            index = indices[0] + 1;
        //        } else {
        //            index = indices.last() + 1;
        //        }
        //    } else {
        //        index = canvasIndex + 1;
        //    }
        //
        //    if (index > this.getLastPageIndex()) {
        //        return -1;
        //    }
        //
        //    return index;
        //},
        //
        //getPagedIndices: function(canvasIndex?: number, pagingEnabled?: boolean): number[]{
        //    if (_.isUndefined(canvasIndex)) canvasIndex = this.canvasIndex;
        //
        //    var indices = [];
        //
        //    if (!pagingEnabled) {
        //        indices.push(this.canvasIndex);
        //    } else {
        //        if (this.isFirstCanvas(canvasIndex) || this.isLastCanvas(canvasIndex)){
        //            indices = [canvasIndex];
        //        } else if (canvasIndex % 2){
        //            indices = [canvasIndex, canvasIndex + 1];
        //        } else {
        //            indices = [canvasIndex - 1, canvasIndex];
        //        }
        //
        //        if (this.getViewingDirection() === m.ViewingDirection.rightToLeft){
        //            indices = indices.reverse();
        //        }
        //    }
        //
        //    return indices;
        //},
        //
        //getPrevPageIndex: function(canvasIndex?: number, pagingEnabled?: boolean): number {
        //    if (_.isUndefined(canvasIndex)) canvasIndex = this.canvasIndex;
        //
        //    var index;
        //
        //    if (pagingEnabled){
        //        var indices = this.getPagedIndices(canvasIndex);
        //
        //        if (this.getViewingDirection() === m.ViewingDirection.rightToLeft){
        //            index = indices.last() - 1;
        //        } else {
        //            index = indices[0] - 1;
        //        }
        //
        //    } else {
        //        index = canvasIndex - 1;
        //    }
        //
        //    return index;
        //},
        //
        //getRangeByCanvasIndex(canvasIndex: number): m.Range {
        //    if (canvasIndex === -1) return null;
        //    var canvas: m.Canvas = this.getCanvasByIndex(canvasIndex);
        //    return this.getCanvasRange(canvas);
        //},
        //
        //getRangeById: function(id: string): m.Range {
        //    for (var i = 0; i < this.manifest.structures.length; i++) {
        //        var range = this.manifest.structures[i];
        //
        //        if (range.id === id){
        //            return range;
        //        }
        //    }
        //
        //    return null;
        //},
        //
        //getRangeByPath: function(path: string): m.Range{
        //
        //    for (var i = 0; i < this.getTotalCanvases(); i++) {
        //        var canvas: m.Canvas = this.getCanvasByIndex(i);
        //
        //        for (var j = 0; j < canvas.ranges.length; j++) {
        //            var range: m.Range = canvas.ranges[j];
        //
        //            if (range.path === path) {
        //                return range;
        //            }
        //        }
        //    }
        //
        //    return null;
        //},
        //
        //// todo: is this needed?
        //getSeeAlso(): any {
        //    return this.manifest.seeAlso;
        //},
        //
        //getService: function(resource: any, profile: string): m.Service {
        //    if (!resource.service) return null;
        //
        //    if (_.isArray(resource.service)){
        //        for (var i = 0; i < resource.service.length; i++){
        //            var service = resource.service[i];
        //            if (service.profile && service.profile === profile) {
        //                return service;
        //            }
        //        }
        //    } else {
        //        if (resource.service.profile && resource.service.profile === profile){
        //            return resource.service;
        //        }
        //    }
        //
        //    return null;
        //},
        //
        //getStartCanvasIndex: function(): number {
        //    var sequence = this.getCurrentSequence();
        //
        //    if (sequence.startCanvas) {
        //        // if there's a startCanvas attribute, loop through the canvases and return the matching index.
        //        for (var i = 0; i < this.getTotalCanvases(); i++) {
        //            var canvas = this.getCanvasByIndex(i);
        //
        //            if (canvas.id === sequence.startCanvas) return i;
        //        }
        //    }
        //
        //    // default to first canvas.
        //    return 0;
        //},
        //
        //// todo: is this needed?
        //getTitle(): string {
        //    return this.manifest.label;
        //},
        //
        //getTotalCanvases: function(): number{
        //    return this.getCurrentSequence().canvases.length;
        //},
        //
        //getTotalSequences: function(): number{
        //    return this.manifest.sequences.length;
        //},
        //
        //getThumbs: function(width: number, height?: number): m.Thumb[] {
        //    var thumbs: m.Thumb[] = [];
        //
        //    for (var i = 0; i < this.getTotalCanvases(); i++) {
        //        var canvas: m.Canvas = this.getCanvasByIndex(i);
        //
        //        if (!_.isNumber(height)) {
        //            var heightRatio = canvas.height / canvas.width;
        //
        //            if (heightRatio) {
        //                height = Math.floor(width * heightRatio);
        //            }
        //        }
        //
        //        var uri = this.getThumbUri(canvas, width, height);
        //
        //        thumbs.push(new m.Thumb(i, uri, this.getLocalisedValue(canvas.label), width, height, true));
        //    }
        //
        //    return thumbs;
        //},
        //
        //getThumbUri: function(canvas: any, width: number, height: number): string {
        //
        //    var uri;
        //
        //    if (canvas.resources){
        //        uri = canvas.resources[0].resource.service.id;
        //    } else if (canvas.images && canvas.images[0].resource.service){
        //        uri = canvas.images[0].resource.service.id;
        //    } else {
        //        return null;
        //    }
        //
        //    // todo: allow region, rotation, quality, and format as parameters?
        //    var tile = 'full/' + width + ',' + height + '/0/default.jpg';
        //
        //    return path.join(uri, tile);
        //},
        //
        //getViewingDirection: function(): string {
        //    return this.getCurrentSequence().viewingDirection || m.ViewingDirection.leftToRight;
        //},
        //
        //isCanvasIndexOutOfRange: function(canvasIndex: number): boolean {
        //    return canvasIndex > this.getTotalCanvases() - 1;
        //},
        //
        //isFirstCanvas: function(canvasIndex?: number): boolean {
        //    if (_.isUndefined(canvasIndex)) canvasIndex = this.canvasIndex;
        //    return canvasIndex === 0;
        //},
        //
        //isLastCanvas: function(canvasIndex?: number): boolean {
        //    if (_.isUndefined(canvasIndex)) canvasIndex = this.canvasIndex;
        //    return canvasIndex === this.getTotalCanvases() - 1;
        //},
        //
        //isMultiCanvas: function(): boolean{
        //    return this.getTotalCanvases() > 1;
        //},
        //
        //isMultiSequence: function(): boolean{
        //    return this.getTotalSequences() > 1;
        //},
        //
        //// checks if the number of canvases is even - therefore has a front and back cover
        //isTotalCanvasesEven: function(): boolean {
        //    return this.getTotalCanvases() % 2 === 0;
        //}
    }
}