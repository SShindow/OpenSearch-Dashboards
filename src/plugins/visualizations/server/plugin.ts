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
import { Observable } from 'rxjs';
import { UsageCollectionSetup } from 'src/plugins/usage_collection/server';
import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../core/server';

import {
  VISUALIZE_ENABLE_LABS_SETTING,
  VISUALIZE_DISABLE_BUCKET_AGG_SETTING,
} from '../common/constants';

import { visualizationSavedObjectType } from './saved_objects';

import { VisualizationsPluginSetup, VisualizationsPluginStart } from './types';
import { registerVisualizationsCollector } from './usage_collector';

export class VisualizationsPlugin
  implements Plugin<VisualizationsPluginSetup, VisualizationsPluginStart> {
  private readonly logger: Logger;
  private readonly config: Observable<{ opensearchDashboards: { index: string } }>;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
    this.config = initializerContext.config.legacy.globalConfig$;
  }

  public setup(core: CoreSetup, plugins: { usageCollection?: UsageCollectionSetup }) {
    this.logger.debug('visualizations: Setup');

    core.savedObjects.registerType(visualizationSavedObjectType);

    core.uiSettings.register({
      [VISUALIZE_ENABLE_LABS_SETTING]: {
        name: i18n.translate('visualizations.advancedSettings.visualizeEnableLabsTitle', {
          defaultMessage: 'Bật trực quan thử nghiệm',
        }),
        value: true,
        description: i18n.translate('visualizations.advancedSettings.visualizeEnableLabsText', {
          defaultMessage: `Cho phép người dùng tạo, xem và chỉnh sửa trực quan thử nghiệm. Nếu bị tắt,\n chỉ những hình ảnh trực quan được coi là sẵn sàng sản xuất mới có sẵn cho người dùng.`,
        }),
        category: ['visualization'],
        schema: schema.boolean(),
      },
      [VISUALIZE_DISABLE_BUCKET_AGG_SETTING]: {
        name: i18n.translate('visualizations.advancedSettings.visualizeDisableBucketAgg', {
          defaultMessage: 'Tắt các loại tổng hợp nhóm trực quan',
        }),
        value: [],
        description: i18n.translate(
          'visualizations.advancedSettings.visualizeDisableBucketAgg.description',
          {
            defaultMessage: `Danh sách tên các nhóm tập hợp được phân tách bằng dấu phẩy. ví dụ. quan trọng_terms, điều khoản.\n Tắt các tập hợp nhóm được chỉ định khỏi trực quan.`,
          }
        ),
        category: ['visualization'],
        schema: schema.arrayOf(schema.string()),
      },
    });

    if (plugins.usageCollection) {
      registerVisualizationsCollector(plugins.usageCollection, this.config);
    }

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('visualizations: Started');
    return {};
  }

  public stop() {}
}
