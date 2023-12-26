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
import { FormattedMessage } from '@osd/i18n/react';
import {
  EuiText,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
  EuiSpacer,
} from '@elastic/eui';
import { EditorExample } from './editor_example';

interface Props {
  onClose: () => void;
}

export function HelpPanel(props: Props) {
  return (
    <EuiFlyout onClose={props.onClose} data-test-subj="helpFlyout" size="s">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>
            <FormattedMessage id="console.helpPage.pageTitle" defaultMessage="Trợ giúp" />
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <h3>
            <FormattedMessage
              defaultMessage="Định dạng yêu cầu"
              id="console.helpPage.requestFormatTitle"
            />
          </h3>
          <p>
            <FormattedMessage
              id="console.helpPage.requestFormatDescription"
              defaultMessage="Bạn có thể nhập một hoặc nhiều yêu cầu vào trình soạn thảo màu trắng. Bảng điều khiển hiểu các yêu cầu ở định dạng nhỏ gọn:"
            />
          </p>
          <EditorExample panel="help" />
          <h3>
            <FormattedMessage
              id="console.helpPage.keyboardCommandsTitle"
              defaultMessage="Lệnh bàn phím"
            />
          </h3>
          <EuiSpacer />
          <dl>
            <dt>Ctrl/Cmd + I</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.autoIndentDescription"
                defaultMessage="Tự động thụt lề yêu cầu hiện tại"
              />
            </dd>
            <dt>Ctrl/Cmd + /</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.openDocumentationDescription"
                defaultMessage="Mở tài liệu cho yêu cầu hiện tại"
              />
            </dd>
            <dt>Ctrl + Space</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.openAutoCompleteDescription"
                defaultMessage="Mở Tự động hoàn thành (ngay cả khi không gõ)"
              />
            </dd>
            <dt>Ctrl/Cmd + Enter</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.submitRequestDescription"
                defaultMessage="Gửi yêu cầu"
              />
            </dd>
            <dt>Ctrl/Cmd + Up/Down</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.jumpToPreviousNextRequestDescription"
                defaultMessage="Chuyển đến phần bắt đầu hoặc kết thúc yêu cầu trước/tiếp theo."
              />
            </dd>
            <dt>Ctrl/Cmd + Alt + L</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.collapseExpandCurrentScopeDescription"
                defaultMessage="Thu gọn/mở rộng phạm vi hiện tại."
              />
            </dd>
            <dt>Ctrl/Cmd + Option + 0</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.collapseAllScopesDescription"
                defaultMessage="Thu gọn tất cả phạm vi trừ phạm vi hiện tại. Mở rộng bằng cách thêm ca."
              />
            </dd>
            <dt>Down arrow</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.switchFocusToAutoCompleteMenuDescription"
                defaultMessage="Chuyển tập trung sang menu tự động hoàn thành. Sử dụng mũi tên để chọn thêm một thuật ngữ"
              />
            </dd>
            <dt>Enter/Tab</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.selectCurrentlySelectedInAutoCompleteMenuDescription"
                defaultMessage="Chọn thuật ngữ hiện được chọn hoặc thuật ngữ hàng đầu trong menu tự động hoàn thành"
              />
            </dd>
            <dt>Esc</dt>
            <dd>
              <FormattedMessage
                id="console.helpPage.keyboardCommands.closeAutoCompleteMenuDescription"
                defaultMessage="Đóng menu tự động hoàn thành"
              />
            </dd>
          </dl>
        </EuiText>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}
