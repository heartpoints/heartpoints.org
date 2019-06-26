import * as React from 'react';
import EditIcon from '@material-ui/icons/Edit';

export const EditButton = ({ navTo, href }) => <EditIcon onClick={() => navTo(`${href}/edit`)} />;
