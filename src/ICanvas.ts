namespace Manifesto {
    export interface ICanvas extends IResource {
        ranges: IRange[];

        //getThumbUri(width: number): string;
        //getType(): CanvasType;
        getCanonicalImageUri(width?: number): string;
        getContent(): IAnnotation[];
        getDuration(): number | null;
        getHeight(): number;
        getImages(): IAnnotation[];
        getIndex(): number;
        getMaxDimensions(): Size | null;
        getWidth(): number;
    }
}