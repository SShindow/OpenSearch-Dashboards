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

export function getUiSettings(): Record<string, UiSettingsParams<unknown>> {
  return {
    'visualization:tileMap:maxPrecision': {
      name: i18n.translate('maps_legacy.advancedSettings.visualization.tileMap.maxPrecisionTitle', {
        defaultMessage: 'Độ chính xác của bản đồ ô xếp tối đa',
      }),
      value: 7,
      description: i18n.translate(
        'maps_legacy.advancedSettings.visualization.tileMap.maxPrecisionText',
        {
          defaultMessage:
            'Độ chính xác GeoHash tối đa được hiển thị trên bản đồ ô xếp: 7 là cao, 10 là rất cao, 12 là tối đa. {cellDimensionsLink}',
          description:
            'Part of composite text: maps_legacy.advancedSettings.visualization.tileMap.maxPrecisionText + ' +
            'maps_legacy.advancedSettings.visualization.tileMap.maxPrecision.cellDimensionsLinkText',
          values: {
            cellDimensionsLink:
              `<a href="https://opensearch.org/docs/latest/dashboards/maptiles"
            target="_blank" rel="noopener noreferrer">` +
              i18n.translate(
                'maps_legacy.advancedSettings.visualization.tileMap.maxPrecision.cellDimensionsLinkText',
                {
                  defaultMessage: 'Giải thích kích thước ô',
                }
              ) +
              '</a>',
          },
        }
      ),
      schema: schema.number(),
      category: ['visualization'],
    },
    'visualization:tileMap:WMSdefaults': {
      name: i18n.translate('maps_legacy.advancedSettings.visualization.tileMap.wmsDefaultsTitle', {
        defaultMessage: 'Thuộc tính WMS mặc định',
      }),
      value: JSON.stringify(
        {
          enabled: false,
          url: '',
          options: {
            version: '',
            layers: '',
            format: 'image/png',
            transparent: true,
            attribution: '',
            styles: '',
          },
        },
        null,
        2
      ),
      type: 'json',
      description: i18n.translate(
        'maps_legacy.advancedSettings.visualization.tileMap.wmsDefaultsText',
        {
          defaultMessage:
            '{propertiesLink} mặc định để hỗ trợ máy chủ bản đồ WMS trong bản đồ tọa độ',
          description:
            'Part of composite text: maps_legacy.advancedSettings.visualization.tileMap.wmsDefaultsText + ' +
            'maps_legacy.advancedSettings.visualization.tileMap.wmsDefaults.propertiesLinkText',
          values: {
            propertiesLink:
              '<a href="http://leafletjs.com/reference.html#tilelayer-wms" target="_blank" rel="noopener noreferrer">' +
              i18n.translate(
                'maps_legacy.advancedSettings.visualization.tileMap.wmsDefaults.propertiesLinkText',
                {
                  defaultMessage: 'tính chất',
                }
              ) +
              '</a>',
          },
        }
      ),
      schema: schema.object({
        enabled: schema.boolean(),
        url: schema.string(),
        options: schema.object({
          version: schema.string(),
          layers: schema.string(),
          format: schema.string(),
          transparent: schema.boolean(),
          attribution: schema.string(),
          styles: schema.string(),
        }),
      }),
      category: ['visualization'],
    },
  };
}
