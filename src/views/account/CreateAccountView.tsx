import * as React from 'react';
import { observer } from 'mobx-react';
import { IStoreContainer } from '../../interfaces/store';
import { TextField } from '@material-ui/core';
import gql from 'graphql-tag';
import { useMutation, ExecutionResult } from 'react-apollo';
import { useState } from 'react';
import { useCreatePrivateKeyMutation } from '../../generated/graphql';


const CreateAccountView: React.FC<IStoreContainer> = observer(({ accountStore, routerStore }: IStoreContainer) => {
    const { push } = routerStore;
    const [createAccount, { data }] = useCreatePrivateKeyMutation();
    const [passphrase, setPassphrase] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassphrase(event.target.value);
    };

    return (
        <div>
            <form
                noValidate
                autoComplete="off"
                onSubmit={e => {
                    e.preventDefault();
                    console.log(data);
                    createAccount({
                        variables: {
                            passphrase: passphrase
                        }
                    })
                    .then((e: ExecutionResult<any>) => {
                        console.log(e);
                        const address = e.data.keyStore.createPrivateKey.address;
                        accountStore.addAddress(address);
                        push('/');
                    })
                }}>
                <TextField id="standard-basic" label="passpaharase" onChange={handleChange} />
                <button disabled={passphrase === ''} type={"submit"} > Create Account </button>
            </form>
            <br />
        </div>
    );
})

export default CreateAccountView
