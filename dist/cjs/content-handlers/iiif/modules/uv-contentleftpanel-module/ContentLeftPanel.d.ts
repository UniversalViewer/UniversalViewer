import { Root } from "react-dom/client";
import { ViewingHint, ViewingDirection } from "@iiif/vocabulary/dist-commonjs/";
import { GalleryView } from "./GalleryView";
import { LeftPanel } from "../uv-shared-module/LeftPanel";
import { TreeView } from "./TreeView";
import { TreeNode } from "manifesto.js";
import { AnnotationGroup, TreeSortType } from "@iiif/manifold";
export declare class ContentLeftPanel extends LeftPanel {
    $bottomOptions: JQuery;
    $galleryView: JQuery;
    $leftOptions: JQuery;
    $options: JQuery;
    $rightOptions: JQuery;
    $sortButtonGroup: JQuery;
    $sortByDateButton: JQuery;
    $sortByLabel: JQuery;
    $sortByVolumeButton: JQuery;
    $tabs: JQuery;
    $tabsContent: JQuery;
    $thumbsButton: JQuery;
    $thumbsView: JQuery;
    $topOptions: JQuery;
    $treeButton: JQuery;
    $treeView: JQuery;
    $treeViewOptions: JQuery;
    $treeSelect: JQuery;
    $views: JQuery;
    expandFullEnabled: boolean;
    galleryView: GalleryView;
    isThumbsViewOpen: boolean;
    isTreeViewOpen: boolean;
    treeData: TreeNode;
    treeSortType: TreeSortType;
    treeView: TreeView;
    thumbsRoot: Root;
    constructor($element: JQuery);
    create(): void;
    createTreeView(): void;
    render(): void;
    updateTreeViewOptions(): void;
    sortByDate(): void;
    sortByVolume(): void;
    isCollection(): boolean;
    renderTree(): void;
    getTreeData(): {
        autoExpand: boolean;
        branchNodesExpandOnClick: boolean;
        branchNodesSelectable: boolean;
        helper: import("@iiif/manifold").Helper;
        topRangeIndex: number;
        treeSortType: TreeSortType;
    };
    private _isTreeAutoExpanded;
    updateTreeTabByCanvasIndex(): void;
    setTreeTabTitle(title: string): void;
    updateTreeTabBySelection(): void;
    getViewingHint(): ViewingHint | null;
    getViewingDirection(): ViewingDirection | null;
    createThumbsRoot(): void;
    renderThumbs(): void;
    createGalleryView(): void;
    renderGallery(): void;
    getGalleryData(): {
        helper: import("@iiif/manifold").Helper;
        chunkedResizingThreshold: any;
        content: any;
        debug: boolean;
        imageFadeInDuration: number;
        initialZoom: number;
        minLabelWidth: number;
        pageModeEnabled: boolean;
        scrollStopDuration: number;
        searchResults: AnnotationGroup[];
        sizingEnabled: boolean;
        thumbHeight: any;
        thumbLoadPadding: any;
        thumbWidth: any;
        viewingDirection: ViewingDirection | null;
    };
    isPageModeEnabled(): boolean;
    getSelectedTree(): JQuery;
    getSelectedTopRangeIndex(): number;
    getTree(): TreeNode | null;
    toggleFinish(): void;
    defaultToThumbsView(): boolean;
    expandFullStart(): void;
    expandFullFinish(): void;
    collapseFullStart(): void;
    collapseFullFinish(): void;
    openTreeView(): void;
    openThumbsView(): void;
    selectTopRangeIndex(index: number): void;
    getCurrentCanvasTopRangeIndex(): number;
    selectCurrentTreeNode(): void;
    selectCurrentTreeNodeByRange(): void;
    selectCurrentTreeNodeByCanvas(): void;
    selectTreeNodeByManifest(): void;
    resize(): void;
}
