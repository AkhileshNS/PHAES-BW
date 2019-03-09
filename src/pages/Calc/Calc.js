
// External Modules
import React from 'react';
import {Box, Text} from 'grommet';

// Internal Components
import A from '../../components/A/A';
import B from '../../components/B/B';

const calc = () => {
  return <Box align="center" justify="center">
    <Text>The Left and Right are completely seperate components. There is no state or props being passed to them</Text>
    <Box width="medium" direction="row" >
        <A />
        <B />
    </Box>
  </Box>
}

export default calc;
