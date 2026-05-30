import {
	App,
	PluginSettingTab,
	SettingDefinitionItem,
	SettingGroup,
	SettingPage,
} from 'obsidian';
import SettingPageNotRenderingOnSearchItemSelectPlugin from './main';

export interface SettingPageNotRenderingOnSearchItemSelectPluginSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: SettingPageNotRenderingOnSearchItemSelectPluginSettings =
	{
		mySetting: 'default',
	};

export class SettingTab extends PluginSettingTab {
	plugin: SettingPageNotRenderingOnSearchItemSelectPlugin;

	constructor(
		app: App,
		plugin: SettingPageNotRenderingOnSearchItemSelectPlugin,
	) {
		super(app, plugin);
		this.plugin = plugin;
	}

	getSettingDefinitions(): SettingDefinitionItem[] {
		return [
			{
				type: 'page',
				name: 'Items',
				desc: 'Rendered with "items"',
				items: [
					{
						type: 'group',
						name: 'Item',
						desc: 'Rendered with "items"',
						items: [
							{
								name: 'Item',
								desc: 'Rendered with "items"',
								control: {
									type: 'text',
									key: 'mySetting',
								},
							},
						],
					},
				],
			},
			{
				type: 'page',
				name: 'Page',
				desc: 'Rendred with "page"',
				page: () => new MySettingPage(this),
			},
		];
	}
}

class MySettingPage extends SettingPage {
	constructor(private pluginSettingTab: SettingTab) {
		super();
	}

	display(): void {
		this.containerEl.empty();

		new SettingGroup(this.containerEl).addSetting((setting) => {
			setting
				.setName('Item')
				.setDesc('Rendered with "page"')
				.addText((cb) => {
					cb.setValue(
						this.pluginSettingTab.plugin.settings.mySetting,
					).onChange(async (value) => {
						await this.pluginSettingTab.setControlValue(
							'mySetting',
							value,
						);
					});
				});
		});
	}
}
