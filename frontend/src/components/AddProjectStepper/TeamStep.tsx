import React from 'react';
import {
  Typography,
  TextField,
  Stack,
  SelectChangeEvent,
  IconButton,
} from '@mui/material';
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
import { CreateProjectFields, Salary } from './types';

export const TeamStep = () => {
  const { values, errors, touched, handleChange, setFieldValue } =
    useFormikContext<FormikValues>();
  const { managersChoices, employeesChoices } = useNormalizedUsers();

  const handleClearEmployees = (
    item: string,
    salaryHelpers: FieldArrayRenderProps
  ) => {
    const indexRemoveSalary = values[CreateProjectFields.Salary].indexOf(
      values[CreateProjectFields.Salary].find(
        ({ users }: ComponentProjectSalaryInput) => users === item
      )
    );
    setFieldValue(
      `${CreateProjectFields.Users}`,
      values[CreateProjectFields.Users].filter(
        (user: string) =>
          +user !== +values[CreateProjectFields.Salary][indexRemoveSalary].users
      )
    );
    salaryHelpers.remove(indexRemoveSalary);
  };

  const handleChangeEmployees = (
    e: SelectChangeEvent<unknown>,
    salaryHelpers: FieldArrayRenderProps
  ) => {
    handleChange(e);

    const addedUsers = (e.target as { value: Scalars['ID'][] }).value;
    const salaries: ComponentProjectSalaryInput[] =
      values[CreateProjectFields.Salary];
    const salaryUsers = salaries.map(({ users }) => users);

    const addSalary = addedUsers.filter((x) => !salaryUsers.includes(x));
    const removeSalary = salaryUsers.filter(
      (x) => !addedUsers.includes(x as string)
    );

    if (addSalary.length > 0) {
      salaryHelpers.push({ users: addSalary[0], rate: 0 } as Salary);
    }

    if (removeSalary.length > 0) {
      const indexRemoveSalary = values[CreateProjectFields.Salary].indexOf(
        values[CreateProjectFields.Salary].find(
          ({ users }: ComponentProjectSalaryInput) => users === removeSalary[0]
        )
      );
      salaryHelpers.remove(indexRemoveSalary);
    }
  };

  return (
    <>
      <Typography variant="h5">Team</Typography>
      <Stack gap={4}>
        <Select
          label="Project manager"
          variant="outlined"
          name={CreateProjectFields.Manager}
          items={managersChoices}
          value={values[CreateProjectFields.Manager]}
          error={
            touched[CreateProjectFields.Manager] &&
            !!errors[CreateProjectFields.Manager]
          }
          helperText={
            touched[CreateProjectFields.Manager] &&
            (errors[CreateProjectFields.Manager] as string)
          }
          onChange={handleChange}
        />

        <FieldArray
          name={CreateProjectFields.Salary}
          render={(salaryHelpers) => (
            <>
              <MultipleSelect
                label="Employees"
                variant="outlined"
                name={CreateProjectFields.Users}
                items={employeesChoices}
                value={values[CreateProjectFields.Users]}
                handleClear={() => {
                  setFieldValue(`${CreateProjectFields.Users}`, []);
                  setFieldValue(`${CreateProjectFields.Salary}`, []);
                }}
                handleClearItem={(item: string) =>
                  handleClearEmployees(item, salaryHelpers)
                }
                error={
                  touched[CreateProjectFields.Users] &&
                  !!errors[CreateProjectFields.Users]
                }
                helperText={
                  touched[CreateProjectFields.Users] &&
                  (errors[CreateProjectFields.Users] as string)
                }
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
                      >
                        <Typography>
                          {
                            employeesChoices.find(
                              ({ value }) => employee.users === value
                            )?.label
                          }
                        </Typography>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                          gap={4}
                        >
                          {values[CreateProjectFields.Type] !==
                            Enum_Project_Type.NonProfit && (
                            <>
                              <TextField
                                label="Rate"
                                autoComplete="off"
                                type="number"
                                value={
                                  values[CreateProjectFields.Salary][i].rate
                                }
                                onChange={(e) => {
                                  setFieldValue(
                                    `${CreateProjectFields.Salary}.${i}.rate`,
                                    +e.target.value
                                  );
                                }}
                              />
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  setFieldValue(
                                    `${CreateProjectFields.Users}`,
                                    values[CreateProjectFields.Users].filter(
                                      (user: string) =>
                                        +user !==
                                        +values[CreateProjectFields.Salary][i]
                                          .users
                                    )
                                  );
                                  salaryHelpers.remove(i);
                                }}
                              >
                                <Icon icon="deleteOutline" />
                              </IconButton>
                            </>
                          )}
                        </Stack>
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
