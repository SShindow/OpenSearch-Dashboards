/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { FC } from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiLink,
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiSpacer,
  EuiText,
} from '@elastic/eui';
import { i18n } from '@osd/i18n';
import { FormattedMessage } from '@osd/i18n/react';
import { CoreStart } from 'opensearch-dashboards/public';
import {
  RedirectAppLinks,
  useOpenSearchDashboards,
} from '../../../../../../src/plugins/opensearch_dashboards_react/public';

interface Props {
  addBasePath: (path: string) => string;
  onClose: () => void;
}

export const NewThemeModal: FC<Props> = ({ addBasePath, onClose }) => {
  const {
    services: { application },
  } = useOpenSearchDashboards<CoreStart>();

  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>
          <FormattedMessage
            id="home.newThemeModal.title"
            defaultMessage="Giới thiệu giao diện Trang tổng quan OpenSearch mới"
          />
        </EuiModalHeaderTitle>
      </EuiModalHeader>

      <EuiModalBody>
        <RedirectAppLinks application={application}>
          <EuiText>
            <FormattedMessage
              id="home.newThemeModal.previewDescription.previewDetail"
              defaultMessage="Bạn hiện đang xem trước chủ đề Bảng thông tin OpenSearch mới nhất với các chế độ sáng và tối được cải tiến. Bạn hoặc quản trị viên của bạn có thể thay đổi chủ đề trước đó bằng cách truy cập {advancedSettingsLink}."
              values={{
                advancedSettingsLink: (
                  <EuiLink
                    href={addBasePath('/app/management/opensearch-dashboards/settings#appearance')}
                  >
                    <FormattedMessage
                      id="home.newThemeModal.previewDescription.advancedSettingsLinkText"
                      defaultMessage="Cài đặt nâng cao"
                    />
                  </EuiLink>
                ),
              }}
            />
          </EuiText>
        </RedirectAppLinks>
        <EuiSpacer />
        <EuiFlexGroup gutterSize="s">
          <EuiFlexItem>
            <EuiImage
              url={addBasePath('/plugins/home/assets/new_theme_light.png')}
              alt={i18n.translate('home.newThemeModal.lightModeImageAltDescription', {
                defaultMessage: 'ảnh chụp màn hình của màu chủ đề mới trong chế độ sáng',
              })}
            />
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiImage
              url={addBasePath('/plugins/home/assets/new_theme_dark.png')}
              alt={i18n.translate('home.newThemeModal.darkModeImageAltDescription', {
                defaultMessage: 'ảnh chụp màn hình của màu chủ đề mới trong chế độ tối',
              })}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiModalBody>

      <EuiModalFooter>
        <EuiButton onClick={onClose} fill>
          <FormattedMessage id="home.newThemeModal.dismissButtonLabel" defaultMessage="Bỏ qua" />
        </EuiButton>
      </EuiModalFooter>
    </EuiModal>
  );
};
