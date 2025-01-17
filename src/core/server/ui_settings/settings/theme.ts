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

import { schema } from '@osd/config-schema';
import { i18n } from '@osd/i18n';
import { UiSettingsParams } from '../../../types';

export const getThemeSettings = (): Record<string, UiSettingsParams> => {
  return {
    'theme:darkMode': {
      name: i18n.translate('core.ui_settings.params.darkModeTitle', {
        defaultMessage: 'Chế độ tối',
      }),
      value: false,
      description: i18n.translate('core.ui_settings.params.darkModeText', {
        defaultMessage: `Bật chế độ tối cho giao diện người dùng Bảng điều khiển OpenSearch. Cần phải làm mới trang để áp dụng cài đặt.`,
      }),
      requiresPageReload: true,
      category: ['appearance'],
      schema: schema.boolean(),
    },
    'theme:version': {
      name: i18n.translate('core.ui_settings.params.themeVersionTitle', {
        defaultMessage: 'Phiên bản chủ đề',
      }),
      value: 'Next (preview)',
      type: 'select',
      options: ['v7', 'Next (preview)'],
      description: i18n.translate('core.ui_settings.params.themeVersionText', {
        defaultMessage: `<p>Chuyển đổi giữa chủ đề được sử dụng cho phiên bản hiện tại và phiên bản tiếp theo của Bảng thông tin OpenSearch. Cần phải làm mới trang để áp dụng cài đặt.</p><p><a href="{href}">{linkText}</a></p>`,
        values: {
          href: 'https://forum.opensearch.org/t/feedback-on-dark-mode-experience/15725',
          linkText: 'Theme feedback',
        },
      }),
      requiresPageReload: true,
      category: ['appearance'],
      schema: schema.oneOf([schema.literal('v7'), schema.literal('Next (preview)')]),
    },
  };
};
