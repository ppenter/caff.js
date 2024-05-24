import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export default function CollabZone({children}: any){
    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:3001", {
        onClose: () => {
            sendMessage('update|0|0|close')
        },
    });

    const [cursors, setCursors] = useState<any>({});
    const zoneRef = React.useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    function getColorFromId(id: string) {
        // A simple hash function
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
    
        // Convert the hash to a 6 digit hexadecimal color
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF;
            color += ('00' + value.toString(16)).substr(-2);
        }
    
        return color;
    }

    useEffect(() => {
        const message = lastMessage ? lastMessage.data : '';
        if (message.startsWith('update')) {
            const parts = message.split('|');
            const userId = parts[1];
            const x = parseInt(parts[2], 10);
            const y = parseInt(parts[3], 10);

            // Adjust the coordinates by subtracting the updated offset
            setCursors((prevCursors: any) => ({
                ...prevCursors,
                [userId]: { x: x - 10, y: y - 5 }
            }));
        }else if(message.startsWith('close')){
            const parts = message.split('|');
            const userId = parts[1];
            setCursors((prevCursors: any) => {
                delete prevCursors[userId];
                return prevCursors;
            });
        }
    }, [lastMessage])

    useEffect(() => {
        const updateOffset = () => {
            if (zoneRef.current) {
                const rect = zoneRef.current.getBoundingClientRect();
                setOffset({ x: rect.left, y: rect.top });
            }
        };

        updateOffset();  // Initial offset calculation

        window.addEventListener('scroll', updateOffset, true);
        window.addEventListener('resize', updateOffset);

        // Cleanup event listeners when component unmounts
        return () => {
            window.removeEventListener('scroll', updateOffset, true);
            window.removeEventListener('resize', updateOffset);
        };
    },[])
    
    return (
        <div className='p-4 flex flex-col gap-4'>
        <div>
        <span className='text-lg font-semibold'>Collaborative Zone (Realtime Example)</span>
        <p className='text-sm text-gray-500'>This websocket server is serve on the same project.</p>
        </div>
            <div ref={zoneRef} className="w-full min-h-[240px] relative rounded-lg border-2 border-dashed border-gray-300 cursor-pointer"
        onMouseMove={(e) => {
            const x = e.clientX - offset.x;
            const y = e.clientY - offset.y;
            sendMessage(`update|${x}|${y}|call`)
        }}
        >
            {
                Object.keys(cursors).map((id) => {
                    return (
                        <div key={id}
                    style={{
                        position: 'absolute',
                        left: cursors[id].x,
                        top: cursors[id].y,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: getColorFromId(id),
                        pointerEvents: 'none' // Make sure the cursor does not interfere with mouse events
                    }}
                />
                    )
                })
            }
        </div>
        </div>
    )
}