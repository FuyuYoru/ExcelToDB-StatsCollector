import { combineReducers } from "@reduxjs/toolkit";
import filesSlice from "./slices/filesSlice";
// import filesDataSlice from "./slices/filesDataSlice";
import overlaySlice from "./slices/overlaySlice";
import tablesSlice from "./slices/tablesSlice";
import initialHeadersValue from "./slices/initialHeaderSlice";
import selectedItemsSlice from "./slices/selectedItemsSlice";
import collectedDataSlice from "./slices/collectedDataSlice";
import processingQueueSlice from "./slices/processingQueueSlice";

const rootReducer = combineReducers({
	files: filesSlice,
	// filesData: filesDataSlice,
	// overlay: overlaySlice,
	tables: tablesSlice,
	initialHeaders: initialHeadersValue,
	selectedItems: selectedItemsSlice,
	collectedData: collectedDataSlice,
	processingQueue: processingQueueSlice,
})

export default rootReducer;