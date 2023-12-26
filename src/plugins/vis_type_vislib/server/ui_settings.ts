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
import { schema } from '@osd/config-schema';

import { UiSettingsParams } from 'opensearch-dashboards/server';
import { DIMMING_OPACITY_SETTING, HEATMAP_MAX_BUCKETS_SETTING } from '../common';

export const uiSettings: Record<string, UiSettingsParams> = {
  [DIMMING_OPACITY_SETTING]: {
    name: i18n.translate('visTypeVislib.advancedSettings.visualization.dimmingOpacityTitle', {
      defaultMessage: 'Giảm độ mờ',
    }),
    value: 0.5,
    type: 'number',
    description: i18n.translate('visTypeVislib.advancedSettings.visualization.dimmingOpacityText', {
      defaultMessage:
        'Độ mờ của các mục biểu đồ bị mờ khi làm nổi bật phần tử khác của biểu đồ. ' +
        'Con số này càng thấp thì phần tử được đánh dấu sẽ càng nổi bật. ' +
        'Đây phải là một số từ 0 đến 1.',
    }),
    category: ['visualization'],
    schema: schema.number(),
  },
  [HEATMAP_MAX_BUCKETS_SETTING]: {
    name: i18n.translate('visTypeVislib.advancedSettings.visualization.heatmap.maxBucketsTitle', {
      defaultMessage: 'Nhóm tối đa của bản đồ nhiệt',
    }),
    value: 50,
    type: 'number',
    description: i18n.translate(
      'visTypeVislib.advancedSettings.visualization.heatmap.maxBucketsText',
      {
        defaultMessage:
          'Số lượng nhóm tối đa mà một nguồn dữ liệu có thể trả về. ' +
          'Con số cao hơn có thể có tác động tiêu cực đến hiệu suất hiển thị của trình duyệt',
      }
    ),
    category: ['visualization'],
    schema: schema.number(),
  },
};
