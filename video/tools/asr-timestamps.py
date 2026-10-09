# Transcription horodatée (zipformer FR streaming, sherpa-onnx) : python3 asr-timestamps.py voix16k.wav sortie.json
# Modèle : github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-streaming-zipformer-fr-2023-04-14.tar.bz2
import sys, json, sherpa_onnx, soundfile as sf, numpy as np
D='sherpa-onnx-streaming-zipformer-fr-2023-04-14/'
rec=sherpa_onnx.OnlineRecognizer.from_transducer(tokens=D+'tokens.txt',encoder=D+'encoder-epoch-29-avg-9-with-averaged-model.onnx',decoder=D+'decoder-epoch-29-avg-9-with-averaged-model.onnx',joiner=D+'joiner-epoch-29-avg-9-with-averaged-model.onnx',num_threads=4,enable_endpoint_detection=False,decoding_method='greedy_search')
a,sr=sf.read(sys.argv[1],dtype='float32')
st=rec.create_stream()
st.accept_waveform(sr,a); st.accept_waveform(sr,np.zeros(int(sr*1.0),dtype='float32')); st.input_finished()
while rec.is_ready(st): rec.decode_stream(st)
r=rec.get_result_all(st)
json.dump({'tokens':list(r.tokens),'ts':list(r.timestamps)},open(sys.argv[2],'w'),ensure_ascii=False)
print(len(r.tokens)); print(r.text[:600])
