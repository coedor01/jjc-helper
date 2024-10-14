import React from 'react';
import { Chip, Box, Typography } from '@mui/material';

interface Option {
  label: string,
  value: string,
}


interface OptionGroup {
  label: string,
  options: Option[]
}

interface ChipCheckboxGroupProps {
  group: OptionGroup,
  values: string[],
  onClick: (value: string) => void;
}


const ChipCheckboxGroup: React.FC<ChipCheckboxGroupProps> = (
  { group, values, onClick }
) => {
  console.log(`values=${values}`);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 2 }}>
      <Box key={group.label} sx={{ textAlign: 'left' }}>
        {/* Group Label */}
        <Typography variant="button" gutterBottom sx={{ display: 'block' }}>
          {group.label}
        </Typography>
        {/* Group Options */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'flex-start', // Align to the left
          }}
        >
          {group.options.map((option) => (
            <Chip
              key={option.value}
              label={option.label} // Display label
              clickable
              onClick={() => onClick(option.value)} // Use value for state and requests
              sx={{
                width: '80px', // Fixed width for each Chip (enough for 5 Chinese characters)
                height: '36px', // Set a standard height for the Chip
                whiteSpace: 'nowrap', // Prevent text wrapping
                overflow: 'hidden', // Hide overflow text
                textOverflow: 'ellipsis', // Show ellipsis for overflow
                backgroundColor: values.includes(option.value)
                  ? 'primary.main'
                  : 'grey.300',
                color: values.includes(option.value) ? 'white' : 'black',
                '&:hover': {
                  backgroundColor: values.includes(option.value)
                    ? 'primary.dark'
                    : 'grey.400',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChipCheckboxGroup;
