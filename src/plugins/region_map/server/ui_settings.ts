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
import { UiSettingsParams } from 'opensearch-dashboards/server';
import { schema } from '@osd/config-schema';
import { CUSTOM_VECTOR_MAP_MAX_SIZE_SETTING } from '../common';

export function getUiSettings(): Record<string, UiSettingsParams<unknown>> {
  return {
    'visualization:regionmap:showWarnings': {
      name: i18n.translate('regionMap.advancedSettings.visualization.showRegionMapWarningsTitle', {
        defaultMessage: 'Hiển thị cảnh báo bản đồ khu vực',
      }),
      value: true,
      description: i18n.translate(
        'regionMap.advancedSettings.visualization.showRegionMapWarningsText',
        {
          defaultMessage:
            'Bản đồ khu vực có hiển thị cảnh báo khi không thể nối các cụm từ với một hình trên bản đồ hay không.',
        }
      ),
      schema: schema.boolean(),
      category: ['visualization'],
    },
    [CUSTOM_VECTOR_MAP_MAX_SIZE_SETTING]: {
      name: i18n.translate('regionMap.advancedSettings.visualization.customVectorMapDefaultSize', {
        defaultMessage: 'Kích thước bản đồ vector tùy chỉnh',
      }),
      value: 1000,
      description: i18n.translate(
        'regionMap.advancedSettings.visualization.customVectorMapDefaultSizeText',
        {
          defaultMessage:
            'Số lượng đối tượng tối đa cần tải từ bản đồ vector tùy chỉnh. Con số cao hơn có thể có tác động tiêu cực đến hiệu suất hiển thị của trình duyệt.',
        }
      ),
      schema: schema.number(),
      category: ['visualization'],
    },
  };
}
