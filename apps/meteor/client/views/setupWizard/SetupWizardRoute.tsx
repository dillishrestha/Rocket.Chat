import { useBreakpoints } from '@rocket.chat/fuselage-hooks';
import { DarkModeProvider } from '@rocket.chat/layout';
import type { ReactElement } from 'react';
import React from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next';

import ModalRegion from '../modal/ModalRegion';
import SetupWizardPage from './SetupWizardPage';
import { useBodyPosition } from './hooks/useBodyPosition';
import { useRouteLock } from './hooks/useRouteLock';
import SetupWizardProvider from './providers/SetupWizardProvider';

export const SetupWizardRoute = (): ReactElement | null => {
	const locked = useRouteLock();
	const breakpoints = useBreakpoints();
	const isMobile = !breakpoints.includes('md');
	useBodyPosition('relative', isMobile);

	const { i18n } = useTranslation();

	if (locked) {
		return null;
	}

	return (
		// FIXME: setting the defaultNS here is problematic for components/hooks expecting it to be 'core'
		<I18nextProvider i18n={i18n} defaultNS='onboarding'>
			<SetupWizardProvider>
				<DarkModeProvider.default>
					<SetupWizardPage />
					<ModalRegion />
				</DarkModeProvider.default>
			</SetupWizardProvider>
		</I18nextProvider>
	);
};

export default SetupWizardRoute;
