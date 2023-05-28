/**
 * External dependencies
 */
import { memo } from "@wordpress/element";
import { __ } from "@wordpress/i18n";

/**
 * Internal dependencies
 */
import NavMenu from "./NavMenu";

function Header() {
    return (
        <header>
            <div className="main-menu">
                <NavMenu />
            </div>
        </header>
    );
}

export default memo(Header);
