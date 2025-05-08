

export const Input = ({
	type,
	value,
	onChange,
	id,
}: {
	type: string
	value: string
	onChange: React.ChangeEventHandler<HTMLInputElement>
	id: string
}) => {
	return (
		<>
			<label htmlFor={id}>{id}</label>
			<input id={id} name={id.toLowerCase()} type={type} value={value} onChange={onChange} />
		</>
	);
};
