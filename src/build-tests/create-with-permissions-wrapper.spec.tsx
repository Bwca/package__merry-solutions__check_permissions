import { render } from '@testing-library/react';

import { createPermissionCheckers } from '../../dist';
import { WithPermissionsProps } from '../models';

const THE_ONLY_AVAILABLE_PERMISSION = 'some-view-permission';

const { WithPermissions } = createPermissionCheckers(() => [THE_ONLY_AVAILABLE_PERMISSION]);

describe('Tests for WithPermissions', () => {
  it('Should render anything really', () => {
    // Arrange
    const renderProps: WithPermissionsProps = {
      children: <div data-test-id="invisible" />,
      permissions: 'some-view-permission',
    };

    // Act
    const { baseElement } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(baseElement).toBeTruthy();
  });
  it('Result should be positive if no required permissions provided', () => {
    // Arrange
    const testId = 'child-element';
    const renderProps: WithPermissionsProps = {
      children: <div data-testid={testId} />,
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(testId)).toBeTruthy();
  });
  it('Result should be positive if required permissions are present in current permissions', () => {
    // Arrange
    const testId = 'child-element';
    const renderProps: WithPermissionsProps = {
      children: <div data-testid={testId} />,
      permissions: THE_ONLY_AVAILABLE_PERMISSION,
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(testId)).toBeTruthy();
  });
  it('Result should be negative if not all required permissions are present', () => {
    // Arrange
    const testId = 'child-element';
    const renderProps: WithPermissionsProps = {
      children: <div data-testid={testId} />,
      permissions: [THE_ONLY_AVAILABLE_PERMISSION, 'some-other-permission'],
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(testId)).toBeFalsy();
  });
  it('Result should be positive if not all required permissions are present when checkAll parameter is set to false', () => {
    // Arrange
    const testId = 'child-element';
    const renderProps: WithPermissionsProps = {
      children: <div data-testid={testId} />,
      permissions: [THE_ONLY_AVAILABLE_PERMISSION, 'some-other-permission'],
      checkAll: false,
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(testId)).toBeTruthy();
  });
});

describe('Tests for WithPermissions placeholder', () => {
  const placeholderId = 'placeholder-id';
  const placeholder = <div data-testid={placeholderId} />;

  it('Placeholder is not visible if no required permissions provided', () => {
    // Arrange
    const renderProps: WithPermissionsProps = {
      children: <div />,
      placeholder,
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(placeholderId)).toBeFalsy();
  });
  it('Placeholder is not visible if required permissions are present in current permissions', () => {
    // Arrange
    const renderProps: WithPermissionsProps = {
      children: <div />,
      permissions: THE_ONLY_AVAILABLE_PERMISSION,
      placeholder,
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(placeholderId)).toBeFalsy();
  });
  it('Placeholder is visible if not all required permissions are present', () => {
    // Arrange
    const renderProps: WithPermissionsProps = {
      children: <div />,
      permissions: [THE_ONLY_AVAILABLE_PERMISSION, 'some-other-permission'],
      placeholder,
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(placeholderId)).toBeTruthy();
  });
  it('Placeholder is not visible if not all required permissions are present when checkAll parameter is set to false', () => {
    // Arrange
    const renderProps: WithPermissionsProps = {
      children: <div />,
      permissions: [THE_ONLY_AVAILABLE_PERMISSION, 'some-other-permission'],
      checkAll: false,
      placeholder,
    };

    // Act
    const { queryByTestId } = render(renderWithPermissionsWrapper(renderProps));

    // Assert
    expect(queryByTestId(placeholderId)).toBeFalsy();
  });
});

function renderWithPermissionsWrapper(props: WithPermissionsProps): JSX.Element {
  return <WithPermissions {...props}></WithPermissions>;
}
