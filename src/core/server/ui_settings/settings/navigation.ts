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
import { isRelativeUrl } from '@osd/std';
import { UiSettingsParams } from '../../../types';

export const getNavigationSettings = (): Record<string, UiSettingsParams> => {
  return {
    defaultRoute: {
      name: i18n.translate('core.ui_settings.params.defaultRoute.defaultRouteTitle', {
        defaultMessage: 'Tuyến đường mặc định',
      }),
      value: '/app/home',
      schema: schema.string({
        validate(value) {
          if (!value.startsWith('/') || !isRelativeUrl(value)) {
            return i18n.translate(
              'core.ui_settings.params.defaultRoute.defaultRouteIsRelativeValidationMessage',
              {
                defaultMessage: 'Must be a relative URL.',
              }
            );
          }
        },
      }),
      description: i18n.translate('core.ui_settings.params.defaultRoute.defaultRouteText', {
        defaultMessage:
          'Cài đặt này chỉ định tuyến mặc định khi mở Bảng thông tin OpenSearch, ' +
          'Bạn có thể sử dụng cài đặt này để sửa đổi trang đích khi mở Bảng thông tin OpenSearch, ' +
          'Tuyến đường phải là một URL tương đối. ',
      }),
    },
    pageNavigation: {
      name: i18n.translate('core.ui_settings.params.pageNavigationName', {
        defaultMessage: 'Kiểu điều hướng bên',
      }),
      value: 'modern',
      description: i18n.translate('core.ui_settings.params.pageNavigationDesc', {
        defaultMessage: 'Thay đổi kiểu điều hướng',
      }),
      type: 'select',
      options: ['modern', 'legacy'],
      optionLabels: {
        modern: i18n.translate('core.ui_settings.params.pageNavigationModern', {
          defaultMessage: 'Hiện đại',
        }),
        legacy: i18n.translate('core.ui_settings.params.pageNavigationLegacy', {
          defaultMessage: 'Di sản',
        }),
      },
      category: ['appearance'],
      schema: schema.oneOf([schema.literal('modern'), schema.literal('legacy')]),
    },
  };
};
