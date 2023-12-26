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
import {
  DEFAULT_COLUMNS_SETTING,
  SAMPLE_SIZE_SETTING,
  AGGS_TERMS_SIZE_SETTING,
  SORT_DEFAULT_ORDER_SETTING,
  SEARCH_ON_PAGE_LOAD_SETTING,
  DOC_HIDE_TIME_COLUMN_SETTING,
  FIELDS_LIMIT_SETTING,
  CONTEXT_DEFAULT_SIZE_SETTING,
  CONTEXT_STEP_SETTING,
  CONTEXT_TIE_BREAKER_FIELDS_SETTING,
  MODIFY_COLUMNS_ON_SWITCH,
} from '../common';

export const uiSettings: Record<string, UiSettingsParams> = {
  [DEFAULT_COLUMNS_SETTING]: {
    name: i18n.translate('discover.advancedSettings.defaultColumnsTitle', {
      defaultMessage: 'Cột mặc định',
    }),
    value: ['_source'],
    description: i18n.translate('discover.advancedSettings.defaultColumnsText', {
      defaultMessage: 'Các cột được hiển thị theo mặc định trong tab Khám phá',
    }),
    category: ['discover'],
    schema: schema.arrayOf(schema.string()),
  },
  [SAMPLE_SIZE_SETTING]: {
    name: i18n.translate('discover.advancedSettings.sampleSizeTitle', {
      defaultMessage: 'Số hàng',
    }),
    value: 500,
    description: i18n.translate('discover.advancedSettings.sampleSizeText', {
      defaultMessage: 'Số hàng hiển thị trong bảng',
    }),
    category: ['discover'],
    schema: schema.number(),
  },
  [AGGS_TERMS_SIZE_SETTING]: {
    name: i18n.translate('discover.advancedSettings.aggsTermsSizeTitle', {
      defaultMessage: 'Số điều mục',
    }),
    value: 20,
    type: 'number',
    description: i18n.translate('discover.advancedSettings.aggsTermsSizeText', {
      defaultMessage:
        'Xác định số lượng thuật ngữ sẽ được hiển thị khi nhấp vào nút \"trực quan\" ' +
        ', trong vùng thả xuống, trong thanh bên khám phá.',
    }),
    category: ['discover'],
    schema: schema.number(),
  },
  [SORT_DEFAULT_ORDER_SETTING]: {
    name: i18n.translate('discover.advancedSettings.sortDefaultOrderTitle', {
      defaultMessage: 'Hướng sắp xếp mặc định',
    }),
    value: 'desc',
    options: ['desc', 'asc'],
    optionLabels: {
      desc: i18n.translate('discover.advancedSettings.sortOrderDesc', {
        defaultMessage: 'Giảm dần',
      }),
      asc: i18n.translate('discover.advancedSettings.sortOrderAsc', {
        defaultMessage: 'Tăng dần',
      }),
    },
    type: 'select',
    description: i18n.translate('discover.advancedSettings.sortDefaultOrderText', {
      defaultMessage:
        'Kiểm soát hướng sắp xếp mặc định cho các mẫu chỉ mục dựa trên thời gian trong ứng dụng Khám phá.',
    }),
    category: ['discover'],
    schema: schema.oneOf([schema.literal('desc'), schema.literal('asc')]),
  },
  [SEARCH_ON_PAGE_LOAD_SETTING]: {
    name: i18n.translate('discover.advancedSettings.searchOnPageLoadTitle', {
      defaultMessage: 'Tìm kiếm khi tải trang',
    }),
    value: true,
    type: 'boolean',
    description: i18n.translate('discover.advancedSettings.searchOnPageLoadText', {
      defaultMessage:
        'Kiểm soát xem tìm kiếm có được thực hiện khi Khám phá tải lần đầu hay không. Cài đặt này không' +
        'có hiệu lực khi tải tìm kiếm đã lưu.',
    }),
    category: ['discover'],
    schema: schema.boolean(),
  },
  [DOC_HIDE_TIME_COLUMN_SETTING]: {
    name: i18n.translate('discover.advancedSettings.docTableHideTimeColumnTitle', {
      defaultMessage: "Ẩn cột 'Thời gian'",
    }),
    value: false,
    description: i18n.translate('discover.advancedSettings.docTableHideTimeColumnText', {
      defaultMessage: "Ẩn cột 'Thời gian' trong phần Khám phá và trong tất cả các Tìm kiếm đã lưu trên Trang tổng quan.",
    }),
    category: ['discover'],
    schema: schema.boolean(),
  },
  [FIELDS_LIMIT_SETTING]: {
    name: i18n.translate('discover.advancedSettings.fieldsPopularLimitTitle', {
      defaultMessage: 'Giới hạn các vùng phổ biến',
    }),
    value: 10,
    description: i18n.translate('discover.advancedSettings.fieldsPopularLimitText', {
      defaultMessage: 'N vùng phổ biến nhất để hiển thị',
    }),
    schema: schema.number(),
  },
  [CONTEXT_DEFAULT_SIZE_SETTING]: {
    name: i18n.translate('discover.advancedSettings.context.defaultSizeTitle', {
      defaultMessage: 'Kích thước nội dung',
    }),
    value: 5,
    description: i18n.translate('discover.advancedSettings.context.defaultSizeText', {
      defaultMessage: 'Số lượng mục xung quanh sẽ hiển thị trong chế độ xem nội dung',
    }),
    category: ['discover'],
    schema: schema.number(),
  },
  [CONTEXT_STEP_SETTING]: {
    name: i18n.translate('discover.advancedSettings.context.sizeStepTitle', {
      defaultMessage: 'Bước kích thước nội dung',
    }),
    value: 5,
    description: i18n.translate('discover.advancedSettings.context.sizeStepText', {
      defaultMessage: 'Kích thước bước để tăng hoặc giảm kích thước ngữ cảnh theo',
    }),
    category: ['discover'],
    schema: schema.number(),
  },
  [CONTEXT_TIE_BREAKER_FIELDS_SETTING]: {
    name: i18n.translate('discover.advancedSettings.context.tieBreakerFieldsTitle', {
      defaultMessage: 'Các vùng liên kết',
    }),
    value: ['_doc'],
    description: i18n.translate('discover.advancedSettings.context.tieBreakerFieldsText', {
      defaultMessage:
        'Danh sách các trường được phân tách bằng dấu phẩy dùng để ngắt liên kết giữa các tài liệu có cùng giá trị dấu thời gian. ' +
        'Từ danh sách này, trường đầu tiên hiện diện và có thể sắp xếp trong mẫu chỉ mục hiện tại sẽ được sử dụng.',
    }),
    category: ['discover'],
    schema: schema.arrayOf(schema.string()),
  },
  [MODIFY_COLUMNS_ON_SWITCH]: {
    name: i18n.translate('discover.advancedSettings.discover.modifyColumnsOnSwitchTitle', {
      defaultMessage: 'Chỉnh sửa đổi cột khi thay đổi mẫu chỉ mục',
    }),
    value: true,
    description: i18n.translate('discover.advancedSettings.discover.modifyColumnsOnSwitchText', {
      defaultMessage: 'Xóa các cột không có sẵn trong mẫu chỉ mục mới.',
    }),
    category: ['discover'],
    schema: schema.boolean(),
  },
};
