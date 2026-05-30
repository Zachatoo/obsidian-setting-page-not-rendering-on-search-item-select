import { Plugin } from 'obsidian';
import {
	DEFAULT_SETTINGS,
	SettingPageNotRenderingOnSearchItemSelectPluginSettings,
	SettingTab,
} from './settings';

export default class SettingPageNotRenderingOnSearchItemSelectPlugin extends Plugin {
	settings!: SettingPageNotRenderingOnSearchItemSelectPluginSettings;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new SettingTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<SettingPageNotRenderingOnSearchItemSelectPluginSettings>,
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
