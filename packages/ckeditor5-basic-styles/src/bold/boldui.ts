/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/**
 * @module basic-styles/bold/boldui
 */

import { Plugin, icons } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';
import type AttributeCommand from '../attributecommand';

const BOLD = 'bold';

/**
 * The bold UI feature. It introduces the Bold button.
 */
export default class BoldUI extends Plugin {
	/**
	 * @inheritDoc
	 */
	public static get pluginName(): 'BoldUI' {
		return 'BoldUI';
	}

	/**
	 * @inheritDoc
	 */
	public init(): void {
		const editor = this.editor;
		const t = editor.t;

		// Add bold button to feature components.
		editor.ui.componentFactory.add( BOLD, locale => {
			const command: AttributeCommand = editor.commands.get( BOLD )!;
			const view = new ButtonView( locale );

			view.set( {
				label: t( 'Bold' ),
				icon: icons.bold,
				keystroke: 'CTRL+B',
				tooltip: true,
				isToggleable: true
			} );

			view.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute command.
			this.listenTo( view, 'execute', () => {
				editor.execute( BOLD );
				editor.editing.view.focus();
			} );

			return view;
		} );
	}
}

declare module '@ckeditor/ckeditor5-core' {
	interface PluginsMap {
		[ BoldUI.pluginName ]: BoldUI;
	}
}
