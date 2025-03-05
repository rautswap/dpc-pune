import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import Color from "@arcgis/core/Color";
export const popupUtils = {
    popUpTemplates: {
        title: "{id} :",
        content: [{
            type: "fields",
            fieldInfos: [
                { fieldName: "division", label: "Division" },
                { fieldName: "district", label: "District" },
                { fieldName: "dtname11", label: "District" },
                { fieldName: "thname11", label: "Taluka" },
                { fieldName: "thtype", label: "Type" },
                { fieldName: "d_name", label: "District" },
                { fieldName: "t_name", label: "Taluka" },
                { fieldName: "name", label: "Village" },
                { fieldName: "dist_name", label: "District" },
                { fieldName: "name", label: "AC Name" },
                { fieldName: "name", label: "Fort Name" },
                { fieldName: "facility_t", label: "Facility" },
                { fieldName: "taluka", label: "Taluka" },
                { fieldName: "name_of_mo", label: "Monument Name" },
                { fieldName: "pc_name", label: "PC Name" },
                { fieldName: "discr", label: "Discription" },
                { fieldName: "location", label: "Location" },
                { fieldName: "v_type", label: "Village" },
                { fieldName: "veterinary", label: "Veterinary Name" },
                { fieldName: "village", label: "Village" },
                { fieldName: "dept", label: "Department" },
                { fieldName: "districtna", label: "District" },
                { fieldName: "block_name", label: "Taluka" },
                { fieldName: "schoolname", label: "School Name" },
                { fieldName: "address", label: "Address" },
                { fieldName: "pincode", label: "Pin Code" },
                { fieldName: "category", label: "Category" },
            ]
        }]
    },
    getLayerById(view, layerId) {
        const foundLayer = view.map.allLayers.find(function (layer) {
            //console.log("Map Layers Id= " + layer.id);
            return layer.id === layerId;
        });
        return foundLayer;
    },
    getLayerByName(view, layerId) {
        const foundLayer = view.map.allLayers.find(function (layer) {
            //console.log("Map Layers Id= " + layer.id);
            return layer.title === layerId;
        });
        return foundLayer;
    },
    zoomTalukaRenderer() {
        var lineSymbol = new SimpleLineSymbol({
            color: new Color([255, 0, 0, 1]), // Red color with full opacity
            width: 3, // Stroke width in pixels
            style: "dash", // Dashed line
            dashArray: [6, 6] // Dash pattern (6px dash, 6px gap)
        });

        // Create a SimpleFillSymbol for the fill
        var fillSymbol = new SimpleFillSymbol({
            color: new Color([255, 255, 0, 0.1]), // Yellow with 10% opacity
            outline: lineSymbol // Apply the lineSymbol as the outline for the fill
        });
        const renderer = {
            type: 'simple',
            symbol: fillSymbol
        }
        return renderer;
    }
}