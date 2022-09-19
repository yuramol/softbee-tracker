import React, { ReactNode } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { ProjectView } from 'pages/ProjectPage/ProjectView';
import { Scalars } from 'types/GraphqlTypes';
import { ProjectReport } from 'pages/ProjectPage/ProjectReport';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

export type ProjectTabsProps = {
  id: Scalars['ID'];
};
export const ProjectTabs: FC<ProjectTabsProps> = ({ id }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      sx={{
        flexDirection: 'row-reverse',
        bgcolor: 'background.paper',
      }}
    >
      <Grid item xs={3}>
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          sx={{
            '.MuiTabs-indicator': {
              left: 0,
            },
          }}
        >
          <Tab
            label="Project info"
            sx={{ fontWeight: '600', textAlign: 'top' }}
          />
          <Tab label="Report" sx={{ fontWeight: '600' }} />
        </Tabs>
      </Grid>
      <Grid container item xs={9}>
        <TabPanel value={value} index={0}>
          <ProjectView id={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ProjectReport projectId={id} />
        </TabPanel>
      </Grid>
    </Grid>
  );
};
