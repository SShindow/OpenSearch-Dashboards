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

import React from 'react';

import { EuiCallOut } from '@elastic/eui';
import { EuiIconType } from '@elastic/eui/src/components/icon/icon';

import { FormattedMessage } from '@osd/i18n/react';
import { MatchedItem } from '../../../../types';

interface StatusMessageProps {
  matchedIndices: {
    allIndices: MatchedItem[];
    exactMatchedIndices: MatchedItem[];
    partialMatchedIndices: MatchedItem[];
  };
  isIncludingSystemIndices: boolean;
  query: string;
  showSystemIndices: boolean;
}

export const StatusMessage: React.FC<StatusMessageProps> = ({
  matchedIndices: { allIndices = [], exactMatchedIndices = [], partialMatchedIndices = [] },
  isIncludingSystemIndices,
  query,
  showSystemIndices,
}) => {
  let statusIcon: EuiIconType | undefined;
  let statusMessage;
  let statusColor: 'primary' | 'success' | 'warning' | undefined;

  const allIndicesLength = allIndices.length;

  if (query.length === 0) {
    statusIcon = undefined;
    statusColor = 'primary';

    if (allIndicesLength >= 1) {
      statusMessage = (
        <span>
          <FormattedMessage
            id="indexPatternManagement.createIndexPattern.step.status.matchAnyLabel.matchAnyDetail"
            defaultMessage="Your index pattern can match {sourceCount, plural,
              one {your # source}
              other {any of your # sources}
            }."
            values={{ sourceCount: allIndicesLength }}
          />
        </span>
      );
    } else if (!isIncludingSystemIndices && showSystemIndices) {
      statusMessage = (
        <span>
          <FormattedMessage
            id="indexPatternManagement.createIndexPattern.step.status.noSystemIndicesWithPromptLabel"
            defaultMessage="Không có chỉ mục OpenSearch nào khớp với mẫu của bạn. Để xem các chỉ số hệ thống phù hợp, hãy bật nút chuyển ở trên."
          />
        </span>
      );
    } else {
      statusMessage = (
        <span>
          <FormattedMessage
            id="indexPatternManagement.createIndexPattern.step.status.noSystemIndicesLabel"
            defaultMessage="Không có chỉ mục OpenSearch nào khớp với mẫu của bạn."
          />
        </span>
      );
    }
  } else if (exactMatchedIndices.length) {
    statusIcon = 'check';
    statusColor = 'success';
    statusMessage = (
      <span>
        &nbsp;
        <FormattedMessage
          id="indexPatternManagement.createIndexPattern.step.status.successLabel.successDetail"
          defaultMessage="Mẫu chỉ mục của bạn khớp với {sourceCount} {sourceCount, số nhiều, một {source} other {sources} }."
          values={{
            sourceCount: exactMatchedIndices.length,
          }}
        />
      </span>
    );
  } else if (partialMatchedIndices.length) {
    statusIcon = undefined;
    statusColor = 'primary';
    statusMessage = (
      <span>
        <FormattedMessage
          id="indexPatternManagement.createIndexPattern.step.status.partialMatchLabel.partialMatchDetail"
          defaultMessage="Mẫu chỉ mục của bạn không khớp với bất kỳ chỉ mục nào, nhưng bạn có {strongIndices} mà {matchedIndicesLength, số nhiều, một {looks} other {look} } tương tự."
          values={{
            matchedIndicesLength: partialMatchedIndices.length,
            strongIndices: (
              <strong>
                <FormattedMessage
                  id="indexPatternManagement.createIndexPattern.step.status.partialMatchLabel.strongIndicesLabel"
                  defaultMessage="{matchedIndicesLength, số nhiều, một {chỉ mục} khác {# chỉ số} }"
                  values={{ matchedIndicesLength: partialMatchedIndices.length }}
                />
              </strong>
            ),
          }}
        />
      </span>
    );
  } else {
    statusIcon = undefined;
    statusColor = 'warning';
    statusMessage = (
      <span>
        <FormattedMessage
          id="indexPatternManagement.createIndexPattern.step.status.notMatchLabel.notMatchDetail"
          defaultMessage="The index pattern you've entered doesn't match any indices.
          You can match {indicesLength, plural,
            one {your}
            other {any of your}
          } {strongIndices}, below."
          values={{
            strongIndices: (
              <strong>
                <FormattedMessage
                  id="indexPatternManagement.createIndexPattern.step.status.notMatchLabel.allIndicesLabel"
                  defaultMessage="{indicesLength, plural,
                    one {# index}
                    other {# indices}
                  }"
                  values={{ indicesLength: allIndicesLength }}
                />
              </strong>
            ),
            indicesLength: allIndicesLength,
          }}
        />
      </span>
    );
  }

  return (
    <EuiCallOut
      size="s"
      color={statusColor}
      data-test-subj="createIndexPatternStatusMessage"
      iconType={statusIcon}
      title={statusMessage}
    />
  );
};
