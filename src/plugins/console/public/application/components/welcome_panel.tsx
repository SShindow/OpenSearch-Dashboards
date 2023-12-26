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

// @ts-ignore
import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
  EuiButton,
  EuiText,
  EuiFlyoutFooter,
} from '@elastic/eui';
import { EditorExample } from './editor_example';

interface Props {
  onDismiss: () => void;
}

export function WelcomePanel(props: Props) {
  return (
    <EuiFlyout onClose={props.onDismiss} data-test-subj="welcomePanel" size="s">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2>
            <FormattedMessage
              id="console.welcomePage.pageTitle"
              defaultMessage="Chào mừng đến với Bảng điều khiển"
            />
          </h2>
        </EuiTitle>
      </EuiFlyoutHeader>
      <EuiFlyoutBody>
        <EuiText>
          <h4>
            <FormattedMessage
              id="console.welcomePage.quickIntroTitle"
              defaultMessage="Giới thiệu nhanh về giao diện người dùng"
            />
          </h4>
          <p>
            <FormattedMessage
              id="console.welcomePage.quickIntroDescription"
              defaultMessage="Giao diện người dùng Console được chia thành hai khung: khung soạn thảo (trái) và khung phản hồi (phải). Sử dụng trình chỉnh sửa để nhập yêu cầu và gửi chúng đến OpenSearch. Kết quả sẽ được hiển thị trong khung phản hồi ở bên phải."
            />
          </p>
          <p>
            <FormattedMessage
              id="console.welcomePage.supportedRequestFormatTitle"
              defaultMessage="Console hiểu các yêu cầu ở định dạng nhỏ gọn, tương tự như cURL:"
            />
          </p>
          <EditorExample panel="welcome" />
          <p>
            <FormattedMessage
              id="console.welcomePage.supportedRequestFormatDescription"
              defaultMessage="Trong khi nhập yêu cầu, Console sẽ đưa ra đề xuất mà bạn có thể chấp nhận bằng cách nhấn Enter/Tab. Những đề xuất này được đưa ra dựa trên cấu trúc yêu cầu cũng như các chỉ mục và loại của bạn.."
            />
          </p>
          <h4>
            <FormattedMessage
              id="console.welcomePage.quickTipsTitle"
              defaultMessage="Một vài lời khuyên nhanh, khi tôi đang có sự chú ý của bạn"
            />
          </h4>
          <ul>
            <li>
              <FormattedMessage
                id="console.welcomePage.quickTips.submitRequestDescription"
                defaultMessage="Gửi yêu cầu tới OpenSearch bằng nút tam giác màu xanh lá cây."
              />
            </li>
            <li>
              <FormattedMessage
                id="console.welcomePage.quickTips.useWrenchMenuDescription"
                defaultMessage="Sử dụng menu cờ lê cho những việc hữu ích khác."
              />
            </li>
            <li>
              <FormattedMessage
                id="console.welcomePage.quickTips.cUrlFormatForRequestsDescription"
                defaultMessage="Bạn có thể dán các yêu cầu ở định dạng cURL và chúng sẽ được dịch sang cú pháp Console."
              />
            </li>
            <li>
              <FormattedMessage
                id="console.welcomePage.quickTips.resizeEditorDescription"
                defaultMessage="Bạn có thể thay đổi kích thước trình soạn thảo và ngăn đầu ra bằng cách kéo dấu phân cách giữa chúng."
              />
            </li>
            <li>
              <FormattedMessage
                id="console.welcomePage.quickTips.keyboardShortcutsDescription"
                defaultMessage="Học các phím tắt bên dưới nút Trợ giúp. Có thứ tốt ở đó!"
              />
            </li>
          </ul>
        </EuiText>
      </EuiFlyoutBody>
      <EuiFlyoutFooter>
        <EuiButton
          fill={true}
          fullWidth={false}
          data-test-subj="help-close-button"
          onClick={props.onDismiss}
        >
          <FormattedMessage id="console.welcomePage.closeButtonLabel" defaultMessage="Bỏ qua" />
        </EuiButton>
      </EuiFlyoutFooter>
    </EuiFlyout>
  );
}
