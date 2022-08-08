import React, {useEffect, useState} from "react"
import styles from "./Counter.module.less"
import {Button} from "antd"
import {MinusOutlined, PlusOutlined} from "@ant-design/icons"

interface CounterProps {
    defaultValue?: number
    onChange: (value: number) => void,
    onDelete?: () => void,
    min?: number
    max?: number
}

const Counter: React.FC<CounterProps> = ({defaultValue = 0, onChange, onDelete, max = Infinity, min = 0}) => {
    const [qty, setQty] = useState<number>(defaultValue)

    const onMinus = () => setQty(prevState => prevState <= min ? min : prevState - 1)
    const onPlus = () => setQty(prevState => prevState >= max ? max : prevState + 1)

    useEffect(() => {
        onChange(qty)
    }, [qty])

    return (
        <div className={styles.actions}>
            <div className={styles.minus}>
                <Button
                    disabled={qty <= min}
                    type="primary"
                    danger={qty <= (min + 1) && !!onDelete}
                    className="blue"
                    shape="circle"
                    size="large"
                    icon={<MinusOutlined />}
                    onClick={() => qty <= min && onDelete ? onDelete() : onMinus()}
                />
            </div>
            <div className={styles.count}>
                {qty}
            </div>
            <div className={styles.plus}>
                <Button
                    disabled={qty >= max}
                    type="primary"
                    className="blue"
                    shape="circle"
                    size="large"
                    icon={<PlusOutlined />}
                    onClick={() => onPlus()}
                />
            </div>
        </div>
    )
}

export default Counter
