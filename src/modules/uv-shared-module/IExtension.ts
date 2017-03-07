import {ILocale} from "../../ILocale";
import {IUVComponent} from "../../IUVComponent";
import {IUVData} from "../../IUVData";
import {Metric} from "./Metric";

export interface IExtension {
    addTimestamp(uri: string): string;
    changeLocale(locale: string): void;
    component: IUVComponent;
    data: IUVData;
    create(): void;
    createModules(): void;
    dependenciesLoaded(...args: any[]): void;
    dependencyLoaded(index: number, dep: any): void;
    fire(name: string, ...args: any[]): void;
    getAlternateLocale(): ILocale | null;
    getCanvasLabels(label: string): string;
    getCurrentCanvases(): Manifesto.ICanvas[];
    getCurrentCanvasRange(): Manifesto.IRange | null;
    getDependencies(callback: (deps: any) => void): any;
    getDomain(): string;
    getEmbedDomain(): string | null;
    getExternalResources(resources?: Manifesto.IExternalResource[]): Promise<Manifesto.IExternalResource[]>;
    getIIIFShareUrl(): string;
    getLocales(): ILocale[];
    getPagedIndices(canvasIndex?: number): number[];
    getSerializedLocales(): string;
    getSettings(): ISettings;
    getShareUrl(): string | null;
    height(): number;
    helper: Manifold.IHelper;
    isCreated: boolean;
    isDeepLinkingEnabled(): boolean;
    isFooterPanelEnabled(): boolean;
    isFullScreen(): boolean;
    isHeaderPanelEnabled(): boolean;
    isLeftPanelEnabled(): boolean;
    isLoggedIn: boolean;
    isOnHomeDomain(): boolean;
    isOverlayActive(): boolean;
    isRightPanelEnabled(): boolean;
    isSeeAlsoEnabled(): boolean;
    jsonp: boolean;
    lastCanvasIndex: number;
    loadDependencies(deps: any): void;
    metric: Metric;
    mouseX: number;
    mouseY: number;
    name: string;
    redirect(uri: string): void;
    refresh(): void;
    reload(data?: IUVData): void;
    resize(): void;
    resources: Manifold.ExternalResource[];
    sanitize(html: string): string;
    shifted: boolean;
    showMessage(message: string, acceptCallback?: any, buttonText?: string, allowClose?: boolean): void;
    tabbing: boolean;
    updateSettings(settings: ISettings): void;
    viewCanvas(canvasIndex: number): void;
    viewCollection(collection: Manifesto.ICollection): void;
    viewManifest(manifest: Manifesto.IManifest): void;
    width(): number;
}