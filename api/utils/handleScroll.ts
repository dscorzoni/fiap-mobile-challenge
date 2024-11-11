import { useState } from "react"
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native"

export const useHandleScroll = () => {
    const [isTitleVisible, setIsTitleVisible] = useState(true)
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y
        setIsTitleVisible(offsetY < 50)
    }
    return { isTitleVisible, handleScroll }
}