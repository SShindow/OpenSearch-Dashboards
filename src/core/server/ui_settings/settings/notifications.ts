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

export const getNotificationsSettings = (): Record<string, UiSettingsParams> => {
  return {
    'notifications:banner': {
      name: i18n.translate('core.ui_settings.params.notifications.bannerTitle', {
        defaultMessage: 'Thông báo biểu ngữ tùy chỉnh',
      }),
      value: '',
      type: 'markdown',
      description: i18n.translate('core.ui_settings.params.notifications.bannerText', {
        defaultMessage:
          'Một biểu ngữ tùy chỉnh dành cho thông báo tạm thời cho tất cả người dùng. {markdownLink}.',
        description:
          'Part of composite text: core.ui_settings.params.notifications.bannerText + ' +
          'core.ui_settings.params.notifications.banner.markdownLinkText',
        values: {
          markdownLink:
            `<a href="https://help.github.com/articles/basic-writing-and-formatting-syntax/"
            target="_blank" rel="noopener noreferrer">` +
            i18n.translate('core.ui_settings.params.notifications.banner.markdownLinkText', {
              defaultMessage: 'Hỗ trợ đánh dấu',
            }) +
            '</a>',
        },
      }),
      category: ['notifications'],
      schema: schema.string(),
    },
    'notifications:lifetime:banner': {
      name: i18n.translate('core.ui_settings.params.notifications.bannerLifetimeTitle', {
        defaultMessage: 'Thời gian tồn tại của thông báo biểu ngữ',
      }),
      value: 3000000,
      description: i18n.translate('core.ui_settings.params.notifications.bannerLifetimeText', {
        defaultMessage:
          'Thời gian tính bằng mili giây mà thông báo biểu ngữ sẽ được hiển thị trên màn hình. ' +
          'Việc đặt thành {infinityValue} sẽ tắt tính năng đếm ngược.',
        values: {
          infinityValue: 'Vô hạn',
        },
      }),
      type: 'number',
      category: ['notifications'],
      schema: schema.oneOf([schema.number({ min: 0 }), schema.literal('Infinity')]),
    },
    'notifications:lifetime:error': {
      name: i18n.translate('core.ui_settings.params.notifications.errorLifetimeTitle', {
        defaultMessage: 'Thời gian tồn tại của thông báo lỗi',
      }),
      value: 300000,
      description: i18n.translate('core.ui_settings.params.notifications.errorLifetimeText', {
        defaultMessage:
          'Thời gian tính bằng mili giây mà thông báo lỗi sẽ được hiển thị trên màn hình. ' +
          'Việc đặt thành {infinityValue} sẽ tắt tính năng đếm ngược.',
        values: {
          infinityValue: 'Vô hạn',
        },
      }),
      type: 'number',
      category: ['notifications'],
      schema: schema.oneOf([schema.number({ min: 0 }), schema.literal('Infinity')]),
    },
    'notifications:lifetime:warning': {
      name: i18n.translate('core.ui_settings.params.notifications.warningLifetimeTitle', {
        defaultMessage: 'Thời gian tồn tại của thông báo cảnh báo',
      }),
      value: 10000,
      description: i18n.translate('core.ui_settings.params.notifications.warningLifetimeText', {
        defaultMessage:
          'Thời gian tính bằng mili giây mà thông báo cảnh báo sẽ được hiển thị trên màn hình. ' +
          'Việc đặt thành {infinityValue} sẽ tắt tính năng đếm ngược.',
        values: {
          infinityValue: 'Vô hạn',
        },
      }),
      type: 'number',
      category: ['notifications'],
      schema: schema.oneOf([schema.number({ min: 0 }), schema.literal('Infinity')]),
    },
    'notifications:lifetime:info': {
      name: i18n.translate('core.ui_settings.params.notifications.infoLifetimeTitle', {
        defaultMessage: '"Thời gian tồn tại của thông báo thông tin',
      }),
      value: 5000,
      description: i18n.translate('core.ui_settings.params.notifications.infoLifetimeText', {
        defaultMessage:
          'Thời gian tính bằng mili giây mà thông báo thông tin sẽ được hiển thị trên màn hình. ' +
          'Việc đặt thành {infinityValue} sẽ tắt tính năng đếm ngược.',
        values: {
          infinityValue: 'Vô hạn',
        },
      }),
      type: 'number',
      category: ['notifications'],
      schema: schema.oneOf([schema.number({ min: 0 }), schema.literal('Infinity')]),
    },
  };
};
