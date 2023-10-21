import { useMemo } from 'react';
import { animated, useTransition } from 'react-spring';




const Message : any= ({
    message = [],
    trail = 35,
    multiplier = 1,
    onMessageEnded = () => {},
    forceShowFullMessage = false,
}) => {
  
    const items = useMemo(
        () => message.trim().split('').map((letter, index) => ({
            item: letter,
            key: index,
        })),
        [message]
    );

    const transitions = useTransition(items, {
        trail,
        from: { display: 'none' },
        enter: { display: '' },
        onRest: (status, controller, item) => {
            if (item.key === items.length - 1) {
                onMessageEnded();
            }
        },
    });

    return (
        <div style={{ fontFamily: '"Press Start 2P"',
        fontSize: `${6 * multiplier}px`,
        textTransform: 'uppercase',}}>
            {forceShowFullMessage && (
                <span>{message}</span>
            )}

            {!forceShowFullMessage && transitions((styles, { item, key }) => (
                <animated.span key={key} style={styles}>
                    {item}
                </animated.span>
            ))}
        </div>
    );
};

export default Message;
