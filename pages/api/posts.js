import { getSession } from "next-auth/react";

const handler = async (req, res)=> {
    const session = await getSession({req: req});

    if (!session) {
        res.status(401).json({message: "You need to be authenticated!"});
        return;
    }

    //do whatever an admin is authorised to do here...
    
    res.status(200).json({message: 'Here in admin post'});
};

export default handler;
