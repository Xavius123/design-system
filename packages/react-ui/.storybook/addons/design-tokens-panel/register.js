import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { DesignTokensPanel } from './Panel';

const ADDON_ID = 'design-tokens-panel';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'Design Tokens',
    match: ({ viewMode }) => viewMode === 'story',
    render: ({ active }) => (
      <AddonPanel active={active}>
        <DesignTokensPanel />
      </AddonPanel>
    ),
  });
});

