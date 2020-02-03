import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'MyPlugin';

export default class MyPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);

    flex.MainHeader.defaultProps.logoUrl = "https://www.lego.com/cdn/cs/set/assets/blt6d3f7d252a252a42/LEGO-Logo-Ani2b.gif";
    flex.Manager.getInstance().strings.NoTasks = "Ready to be brave, curious and focussed?"
    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task 
        ? `https://lego.com/?q=${task.attributes.body}`
        : 'https://lego.com';
    }
    flex.AgentDesktopView.defaultProps.splitterOptions = {
      initialFirstPanelSize: "10%"
    };
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}