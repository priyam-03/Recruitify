import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import styles from '../../styles/freesolo.module.css';

export default function FreeSolo({ options, label, value, name, handleChange }) {
    const handleInputChange = (event, newValue) => {
        // console.log(newValue)
        if (typeof newValue === 'string') {
            handleChange({ name, value: newValue });
        } else if (newValue && newValue.inputValue) {
            handleChange({ name, value: newValue.inputValue });
        } else {
            handleChange({ name, value: newValue });
        }
    };

    return (
        <Stack spacing={2} sx={{
            width: '90%',
            '& .MuiInputBase-root': {
                color: 'white',
            },
            '& .MuiInputLabel-root': {
                color: 'white',
            },
            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
            },
            '& .MuiAutocomplete-popupIndicator': {
                color: 'white',
            },
            '& .MuiAutocomplete-clearIndicator': {
                color: 'white',
            },
        }}>
            <Autocomplete
                className={styles.autocomplete}
                id="free-solo-demo"
                freeSolo
                options={options}
                renderInput={(params) => <TextField {...params} label={label} />}
                value={value}
                onInputChange={(event, newValue) => handleInputChange(event, newValue)}
            />
        </Stack>
    );
}
