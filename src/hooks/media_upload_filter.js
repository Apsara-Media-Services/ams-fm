import { MediaUpload } from "@wordpress/media-utils";
import { addFilter } from "@wordpress/hooks";

addFilter(
    "editor.MediaUpload",
    "core/edit-site/components/media-upload",
    () => MediaUpload
);
