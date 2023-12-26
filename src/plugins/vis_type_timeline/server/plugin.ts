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
import { first } from 'rxjs/operators';
import { TypeOf, schema } from '@osd/config-schema';
import { RecursiveReadonly } from '@osd/utility-types';
import { deepFreeze } from '@osd/std';

import { PluginStart } from '../../data/server';
import { CoreSetup, PluginInitializerContext } from '../../../core/server';
import { configSchema } from '../config';
import loadFunctions from './lib/load_functions';
import { functionsRoute } from './routes/functions';
import { validateOpenSearchRoute } from './routes/validate_es';
import { runRoute } from './routes/run';
import { ConfigManager } from './lib/config_manager';

const experimentalLabel = i18n.translate('timeline.uiSettings.experimentalLabel', {
  defaultMessage: 'thử nghiệm',
});

export interface TimelinePluginStartDeps {
  data: PluginStart;
}

/**
 * Represents Timeline Plugin instance that will be managed by the OpenSearch Dashboards plugin system.
 */
export class Plugin {
  constructor(private readonly initializerContext: PluginInitializerContext) {}

  public async setup(core: CoreSetup): void {
    const config = await this.initializerContext.config
      .create<TypeOf<typeof configSchema>>()
      .pipe(first())
      .toPromise();

    const configManager = new ConfigManager(this.initializerContext.config);

    const functions = loadFunctions('series_functions');

    const getFunction = (name: string) => {
      if (functions[name]) {
        return functions[name];
      }

      throw new Error(
        i18n.translate('timeline.noFunctionErrorMessage', {
          defaultMessage: 'Không có chức năng như vậy: {name}',
          values: { name },
        })
      );
    };

    const logger = this.initializerContext.logger.get('timeline');

    const router = core.http.createRouter();

    const deps = {
      configManager,
      functions,
      getFunction,
      logger,
      core,
    };

    functionsRoute(router, deps);
    runRoute(router, deps);
    validateOpenSearchRoute(router, core);

    core.uiSettings.register({
      'timeline:es.timefield': {
        name: i18n.translate('timeline.uiSettings.timeFieldLabel', {
          defaultMessage: 'Vùng thời gian',
        }),
        value: '@timestamp',
        description: i18n.translate('timeline.uiSettings.timeFieldDescription', {
          defaultMessage: 'Vùng mặc định chứa dấu thời gian khi sử dụng {opensearchParam}',
          values: { opensearchParam: '.opensearch()' },
        }),
        category: ['timeline'],
        schema: schema.string(),
      },
      'timeline:es.default_index': {
        name: i18n.translate('timeline.uiSettings.defaultIndexLabel', {
          defaultMessage: 'Chỉ mục mặc định',
        }),
        value: '_all',
        description: i18n.translate('timeline.uiSettings.defaultIndexDescription', {
          defaultMessage: 'Chỉ mục opensearch mặc định để tìm kiếm bằng {opensearchParam}',
          values: { opensearchParam: '.opensearch()' },
        }),
        category: ['timeline'],
        schema: schema.string(),
      },
      'timeline:target_buckets': {
        name: i18n.translate('timeline.uiSettings.targetBucketsLabel', {
          defaultMessage: 'Nhóm mục tiêu',
        }),
        value: 200,
        description: i18n.translate('timeline.uiSettings.targetBucketsDescription', {
          defaultMessage: 'Số lượng nhóm cần sử dụng khi sử dụng khoảng thời gian tự động',
        }),
        category: ['timeline'],
        schema: schema.number(),
      },
      'timeline:max_buckets': {
        name: i18n.translate('timeline.uiSettings.maximumBucketsLabel', {
          defaultMessage: 'Nhóm tối đa',
        }),
        value: 2000,
        description: i18n.translate('timeline.uiSettings.maximumBucketsDescription', {
          defaultMessage: 'Số lượng nhóm tối đa mà một nguồn dữ liệu có thể trả về',
        }),
        category: ['timeline'],
        schema: schema.number(),
      },
      'timeline:min_interval': {
        name: i18n.translate('timeline.uiSettings.minimumIntervalLabel', {
          defaultMessage: 'Khoảng thời gian tối thiểu',
        }),
        value: '1ms',
        description: i18n.translate('timeline.uiSettings.minimumIntervalDescription', {
          defaultMessage: 'Khoảng thời gian nhỏ nhất sẽ được tính khi sử dụng "tự động"',
          description:
            '"auto" is a technical value in that context, that should not be translated.',
        }),
        category: ['timeline'],
        schema: schema.string(),
      },
      'timeline:graphite.url': {
        name: i18n.translate('timeline.uiSettings.graphiteURLLabel', {
          defaultMessage: 'Graphite URL',
          description:
            'The URL should be in the form of https://www.hostedgraphite.com/UID/ACCESS_KEY/graphite',
        }),
        value:
          config.graphiteAllowedUrls && config.graphiteAllowedUrls.length
            ? config.graphiteAllowedUrls[0]
            : null,
        description: i18n.translate('timeline.uiSettings.graphiteURLDescription', {
          defaultMessage: '{experimentalLabel} URL của máy chủ graphite của bạn',
          values: { experimentalLabel: `<em>[${experimentalLabel}]</em>` },
        }),
        category: ['timeline'],
        schema: schema.nullable(schema.string()),
      },
      'timeline:quandl.key': {
        name: i18n.translate('timeline.uiSettings.quandlKeyLabel', {
          defaultMessage: 'Chìa khóa Quandl',
        }),
        value: 'someKeyHere',
        description: i18n.translate('timeline.uiSettings.quandlKeyDescription', {
          defaultMessage: '{experimentalLabel} Khóa API của bạn từ www.quandl.com',
          values: { experimentalLabel: `<em>[${experimentalLabel}]</em>` },
        }),
        category: ['timeline'],
        schema: schema.string(),
      },
    });
  }

  public start() {
    this.initializerContext.logger.get().debug('Starting plugin');
  }

  public stop() {
    this.initializerContext.logger.get().debug('Stopping plugin');
  }
}
