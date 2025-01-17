/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { i18n } from '@osd/i18n';

const upperFirst = (str = '') => str.replace(/^./, (strng) => strng.toUpperCase());

const names: Record<string, string> = {
  general: i18n.translate('advancedSettings.categoryNames.generalLabel', {
    defaultMessage: 'General',
  }),
  appearance: i18n.translate('advancedSettings.categoryNames.appearanceLabel', {
    defaultMessage: 'Appearance',
  }),
  timeline: i18n.translate('advancedSettings.categoryNames.timelineLabel', {
    defaultMessage: 'Timeline',
  }),
  notifications: i18n.translate('advancedSettings.categoryNames.notificationsLabel', {
    defaultMessage: 'Notifications',
  }),
  visualization: i18n.translate('advancedSettings.categoryNames.visualizationsLabel', {
    defaultMessage: 'Visualization',
  }),
  discover: i18n.translate('advancedSettings.categoryNames.discoverLabel', {
    defaultMessage: 'Discover',
  }),
  dashboard: i18n.translate('advancedSettings.categoryNames.dashboardLabel', {
    defaultMessage: 'Dashboard',
  }),
  reporting: i18n.translate('advancedSettings.categoryNames.reportingLabel', {
    defaultMessage: 'Reporting',
  }),
  search: i18n.translate('advancedSettings.categoryNames.searchLabel', {
    defaultMessage: 'Search',
  }),
  securitySolution: i18n.translate('advancedSettings.categoryNames.securitySolutionLabel', {
    defaultMessage: 'Security Solution',
  }),
};

export function getCategoryName(category?: string) {
  return category ? names[category] || upperFirst(category) : '';
}
