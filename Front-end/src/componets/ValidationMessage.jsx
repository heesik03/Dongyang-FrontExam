const ValidationMessage = ({ isValid, message }) => (
    <p style={{ color: isValid ? 'green' : 'red' }}>
        {isValid ? '✅ ' : '❌ '}
        {message}
    </p>
);    

export default ValidationMessage;