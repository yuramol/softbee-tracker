import React from 'react';
import { Typography, TextField, Stack, SelectChangeEvent } from '@mui/material';
import {
  FieldArray,
  FieldArrayRenderProps,
  FormikValues,
  useFormikContext,
} from 'formik';

import { useNormalizedUsers } from 'hooks';
import { Icon, MultipleSelect, Select } from 'legos';
import {
  Scalars,
  ComponentProjectSalaryInput,
  Enum_Project_Type,
} from 'types/GraphqlTypes';
import { CreateProjectFields } from './types';

export const TeamStep = () => {
  const { values, handleChange, setFieldValue } =
    useFormikContext<FormikValues>();
  const { managersForSelect, employeesForSelect } = useNormalizedUsers();

  const handleChangeEmployees = (
    e: SelectChangeEvent<unknown>,
    salaryHelpers: FieldArrayRenderProps
  ) => {
    handleChange(e);

    const addedUsers = (e.target as { value: Scalars['ID'][] }).value;
    const salarys: ComponentProjectSalaryInput[] =
      values[CreateProjectFields.Salary];
    const salaryUsers = salarys.map(({ users }) => users);

    const addSalery = addedUsers.filter((x) => !salaryUsers.includes(x));
    const removeSalery = salaryUsers.filter(
      (x) => !addedUsers.includes(x as string)
    );

    if (addSalery.length > 0) {
      salaryHelpers.push({ users: addSalery[0], rate: 0 });
    }

    if (removeSalery.length > 0) {
      const indexRemoveSalery = values[CreateProjectFields.Salary].indexOf(
        values[CreateProjectFields.Salary].find(
          ({ users }: ComponentProjectSalaryInput) => users === removeSalery[0]
        )
      );
      salaryHelpers.remove(indexRemoveSalery);
    }
  };

  return (
    <>
      <Typography variant="h5">Team</Typography>
      <Stack gap={4}>
        <Select
          label="Project manager"
          variant="outlined"
          name={CreateProjectFields.Managers}
          items={managersForSelect}
          value={values[CreateProjectFields.Managers]}
          onChange={handleChange}
        />

        <FieldArray
          name={CreateProjectFields.Salary}
          render={(salaryHelpers) => (
            <>
              <MultipleSelect
                label="Employees"
                variant="outlined"
                IconComponent={() => <Icon icon="add" />}
                name={CreateProjectFields.Users}
                items={employeesForSelect}
                value={values[CreateProjectFields.Users]}
                onChange={(e) => handleChangeEmployees(e, salaryHelpers)}
              />
              <Stack gap={3}>
                {values[CreateProjectFields.Salary].length > 0 ? (
                  values[CreateProjectFields.Salary].map(
                    (employee: ComponentProjectSalaryInput, i: number) => (
                      <Stack
                        key={i}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={4}
                      >
                        <Typography>
                          {
                            employeesForSelect?.find(
                              ({ value }) => employee.users === value
                            )?.label
                          }
                        </Typography>
                        {values[CreateProjectFields.Type] !==
                          Enum_Project_Type.NonProfit && (
                          <TextField
                            label="Rate"
                            autoComplete="off"
                            value={values[CreateProjectFields.Salary][i].rate}
                            onChange={(e) => {
                              setFieldValue(
                                `${CreateProjectFields.Salary}.${i}.rate`,
                                e.target.value
                              );
                            }}
                          />
                        )}
                      </Stack>
                    )
                  )
                ) : (
                  <Typography>
                    You have not selected any employees yet
                  </Typography>
                )}
              </Stack>
            </>
          )}
        />
      </Stack>
    </>
  );
};
