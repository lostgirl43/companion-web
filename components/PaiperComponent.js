import { observer } from 'mobx-react';
import React from 'react';
import { colorpalette } from './../viewModels/PersonaViewModel';

@observer
export default class PaiperComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://alivemachine.io/paiper08/js/patch.js";
    document.body.appendChild(script1);
	
	function showError(errId, errMsg) {
            alert('An error occured: ' + errId + ', ' + errMsg);
        }

        function patchInitialized(patch) {
            // You can now access the patch object (patch), register variable watchers and so on
        }
		function say(str){
			CABLES.patch.setVariable("probe",str);
		}
		var loaded = false;
        function patchFinishedLoading(patch) {
			var probe = CABLES.patch.getVar("probe");
			if(probe && loaded==false) {
			// will be called every time value changes
				probe.addListener(function(newValue) {
					if(newValue!=='' && newValue!==' '){
						//document.getElementById('chat-input').setState({value: newValue});

					}
				});
				//document.getElementById('glcanvas').style.width='50%';
				//document.getElementById('glcanvas').style.height='70%';
				//alert(colorpalette[0]);
				var colors = [];
				for(var i=0;i<colorpalette.length;i++){
					colors[i]="#"+colorpalette[i];
				}
				//alert(colors[0]);
				CABLES.patch.setVariable("colorpalette", colors);
				loaded=true;
			}
            // The patch is ready now, all assets have been loaded
        }
	
        document.addEventListener('CABLES.jsLoaded', function (event) {
            CABLES.patch = new CABLES.Patch({
                patch: CABLES.exportedPatch,
                prefixAssetPath: '',
                glCanvasId: 'glcanvas',
                glCanvasResizeToWindow: true,
                onError: showError,
                onPatchLoaded: patchInitialized,
                onFinishedLoading: patchFinishedLoading,
				canvas:{
					alpha:true,
					premultipliedAlpha:true
				}
            });
        });
  }

  render() {
    return (
	<div id={'glcontainer'}>
      <canvas id={`glcanvas`} tabindex="1"></canvas>
	  </div>
    );
  }
}
/*

export default PaiperComponent;
const paiper = props => {
	
	
	componentDidMount () {
    const script = document.createElement("script");
    script.src = "./../dependencies/paiper08/js/patch.js";
    script.async = true;
    this.canvas.appendChild(script);
	
	 script = document.createElement("script");
    script.src = "./../dependencies/paiper08/js/libs.core.min.js";
    script.async = true;
    document.body.appendChild(script);
	 script = document.createElement("script");
    script.src = "./../dependencies/paiper08/js/cables.min.js";
    script.async = true;
    document.body.appendChild(script);
	 script = document.createElement("script");
    script.src = "./../dependencies/paiper08/js/ops.js";
    script.async = true;
    document.body.appendChild(script);
	}
	
	
  
  const canvasRef = useRef(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    //Our first draw
    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [])
  
  return <canvas ref={canvasRef} {...props}/>
}

export default paiper
*/