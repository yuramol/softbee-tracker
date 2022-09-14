import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { FC, useState } from 'react';
import { ProjectView } from 'pages/ProjectPage/ProjectView';
import { Scalars } from 'types/GraphqlTypes';

interface TabPanelProps {
  children?: any;
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

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
export type VerticalTabsProps = {
  id: Scalars['ID'];
};
export const VerticalTabsContainer: FC<VerticalTabsProps> = ({ id }) => {
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
            {...a11yProps(0)}
          />
          <Tab label="Report" sx={{ fontWeight: '600' }} {...a11yProps(1)} />
          <Tab label="2" sx={{ fontWeight: '600' }} {...a11yProps(2)} />
        </Tabs>
      </Grid>
      <Grid container item xs={9}>
        <TabPanel value={value} index={0}>
          <ProjectView id={id} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Grid>
    </Grid>
  );
};
