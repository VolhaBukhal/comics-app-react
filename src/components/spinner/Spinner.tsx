import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/react'

const override = css`
    display: block;
    margin: 0 auto;
`
type MyProps = {
    loading: boolean
}
function Spinner({ loading }: MyProps) {
    return (
        <ClipLoader
            color="darkred"
            loading={loading}
            size={100}
            css={override}
        />
    )
}

export default Spinner
