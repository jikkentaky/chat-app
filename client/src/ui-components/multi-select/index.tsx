import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { FC } from 'react';

type Props = {
  data: ContactItem[] | null
  setSelectedContacts: (contacts: ContactItem[]) => void
}

const MultiSelect: FC<Props> = ({ data, setSelectedContacts }) => {
  if (!data) {
    return null
  }

  const handleChange = (_event: any, value: ContactItem[]) => {
    setSelectedContacts(value);
  };

  return (
    <Autocomplete
      multiple
      options={data}
      disableCloseOnSelect
      getOptionLabel={(option) => option.label}
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.label}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Contacts" placeholder="Add contacts" />
      )}
      onChange={handleChange}
    />
  );
}

export { MultiSelect }

