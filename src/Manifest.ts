
module Manifesto {
    export class Manifest implements IManifest {
        public defaultLabel: string = "-";
        public id: string;
        public jsonld: any;
        public locale: string = "en-GB"; // todo: pass in constructor?
        public manifest: IManifest;
        public rootRange: Range;
        public sequences: Sequence[] = [];

        constructor(jsonld: any) {
            this.jsonld = jsonld;
        }

        getAttribution(): string {
            return this.getLocalisedValue(this.jsonld.attribution);
        }

        getLabel(): string {
            return this.getLocalisedValue(this.jsonld.label);
        }

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

        getLogo(): string {
            return this.jsonld.logo;
        }

        getLicense(): string {
            return this.getLocalisedValue(this.jsonld.license);
        }

        getRanges(): IRange[] {
            // todo: use jmespath to flatten tree
            return null;
        }

        getRangeById(id: string): IRange {

            var ranges = this.getRanges();

            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[i];
                if (range.id === id){
                    return range;
                }
            }

            return null;
        }

        getRangeByPath(path: string): IRange{

            var ranges = this.getRanges();

            for (var i = 0; i < ranges.length; i++) {
                var range = ranges[i];
                if (range.path === path) {
                    return range;
                }
            }

            return null;
        }

        getRendering(resource:any, format: Manifesto.RenderingFormat): Manifesto.Rendering {
            if (!resource.rendering) return null;

            var renderings = resource.rendering;

            if (!_.isArray(renderings)){
                renderings = [renderings];
            }

            for (var i = 0; i < renderings.length; i++){
                var rendering = renderings[i];
                if (rendering.format && rendering.format === format.toString()) {
                    return rendering;
                }
            }

            return null;
        }

        getSeeAlso(): any {
            return this.getLocalisedValue(this.jsonld.seeAlso);
        }

        getService(resource: any, profile: Manifesto.ServiceProfile): IService {
            if (!resource.service) return null;

            if (_.isArray(resource.service)){
                for (var i = 0; i < resource.service.length; i++){
                    var service = resource.service[i];
                    if (service.profile && service.profile === profile) {
                        return service;
                    }
                }
            } else {
                if (resource.service.profile && resource.service.profile === profile){
                    return resource.service;
                }
            }

            return null;
        }

        getSequenceByIndex(sequenceIndex: number): ISequence {
            return this.sequences[sequenceIndex];
        }

        getTitle(): string {
            return this.getLocalisedValue(this.jsonld.label);
        }

        getTotalSequences(): number{
            return this.sequences.length;
        }

        isMultiSequence(): boolean{
            return this.getTotalSequences() > 1;
        }
    }
}