import * as React from 'react';
import { Page } from '../page/Page';
import { PageTitle } from '../page/PageTitle';
import { Space } from '../page/Space';
import { componentForPhase } from './componentForPhase';

export const CastleRisk = (props) => {
    const { phase } = props
    const PhaseSpecificComponent = componentForPhase(phase)
    return <Page>
        <PageTitle>Castle Risk</PageTitle>
        <Space />
        <PhaseSpecificComponent {...props} />
    </Page>
}